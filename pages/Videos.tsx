import React, { useState, useEffect, useRef } from 'react';
import { dailyVideos as initialDailyVideos } from '../data/db';
import { Video, LocalVideo } from '../types';
import Modal from '../components/Modal';

type AnyVideo = Video | LocalVideo;

const DB_NAME = 'EnglishClassDB';
const DB_VERSION = 1;
const STORE_NAME = 'userVideos';

const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = () => reject("Error opening DB");
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };
    });
};

const addVideoToDB = async (video: { id: string, file: File }) => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.add(video);
    return new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject("Transaction error");
    });
};

const getVideosFromDB = async (): Promise<{ id: string, file: File }[]> => {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error fetching videos");
    });
};

const VideoCard: React.FC<{ video: AnyVideo; onClick: () => void }> = ({ video, onClick }) => {
    const thumbnailUrl = video.type === 'youtube'
        ? `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
        : 'https://images.unsplash.com/photo-1527224535759-4d37a1c9d1c8?q=80&w=2070&auto=format&fit=crop';

    return (
        <div onClick={onClick} className="bg-card dark:bg-slate-800 rounded-lg overflow-hidden border border-border dark:border-slate-700/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer hover:border-primary/50 hover:shadow-cyan-500/10">
            <div className="relative aspect-video bg-background dark:bg-[#0F172A]">
                <img src={thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <i className="fas fa-play text-white text-5xl"></i>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg truncate text-card-foreground dark:text-slate-200">{video.title}</h3>
                <p className="text-muted-foreground dark:text-slate-400 text-sm">{video.type === 'youtube' ? video.channel : 'Video Local'}</p>
            </div>
        </div>
    );
};

const Videos: React.FC = () => {
    const [myVideos, setMyVideos] = useState<LocalVideo[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<AnyVideo | null>(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadVideos = async () => {
            try {
                const storedVideos = await getVideosFromDB();
                const localVideos: LocalVideo[] = storedVideos.map(v => ({
                    id: v.id,
                    src: URL.createObjectURL(v.file),
                    title: v.file.name,
                    type: 'local',
                }));
                setMyVideos(localVideos);
            } catch (error) {
                console.error("Failed to load videos from DB:", error);
            }
        };
        loadVideos();
    }, []);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            const videoId = `local_${Date.now()}`;
            try {
                await addVideoToDB({ id: videoId, file });
                const newVideo: LocalVideo = {
                    id: videoId,
                    src: URL.createObjectURL(file),
                    title: file.name,
                    type: 'local',
                };
                setMyVideos(prev => [...prev, newVideo]);
                setIsUploadModalOpen(false);
            } catch(error) {
                console.error("Failed to save video:", error);
                alert('Hubo un error al guardar el video.');
            }
        } else {
            alert('Por favor, selecciona un archivo de video válido.');
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const renderPlayer = () => {
        if (!selectedVideo) return null;
        if (selectedVideo.type === 'youtube') {
            return <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>;
        }
        if (selectedVideo.type === 'local') {
            return <video className="w-full h-full" controls autoPlay src={selectedVideo.src}></video>;
        }
        return null;
    };

    return (
        <div className="bg-background dark:bg-[#0F172A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex justify-between items-center mb-12">
                     <h1 className="text-4xl font-bold text-foreground dark:text-slate-200">Videoteca</h1>
                     <button onClick={() => setIsUploadModalOpen(true)} className="bg-primary text-primary-foreground font-bold py-2 px-5 rounded-full flex items-center gap-2 transition-transform hover:scale-105 shadow-lg">
                        <i className="fas fa-upload"></i>
                        <span>Subir Video</span>
                    </button>
                </div>

                <section id="daily-videos">
                    <h2 className="text-3xl font-bold mb-2 text-foreground dark:text-slate-200">Videos del Día</h2>
                    <p className="text-muted-foreground dark:text-slate-400 mb-8">Contenido fresco para que aprendas algo nuevo cada día.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {initialDailyVideos.map(video => (
                            <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} />
                        ))}
                    </div>
                </section>

                 <section id="my-videos" className="mt-16">
                    <h2 className="text-3xl font-bold mb-8 text-foreground dark:text-slate-200">Mis Videos</h2>
                    {myVideos.length === 0 ? (
                         <div className="text-center py-16 border-2 border-dashed border-border dark:border-slate-700 rounded-lg">
                            <i className="fas fa-video-slash text-slate-400 dark:text-slate-600 text-4xl mb-4"></i>
                            <h3 className="text-lg font-semibold text-foreground dark:text-slate-200">No has subido videos</h3>
                            <p className="mt-1 text-sm text-muted-foreground dark:text-slate-400">Usa el botón "Subir Video" para agregar los tuyos.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {myVideos.map((video, index) => (
                                <VideoCard key={index} video={video} onClick={() => setSelectedVideo(video)} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
            
            {selectedVideo && (
                 <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setSelectedVideo(null)}>
                    <div className="bg-card dark:bg-slate-800 rounded-lg shadow-2xl w-11/12 max-w-4xl max-h-[80vh] flex flex-col overflow-hidden border border-border dark:border-slate-700" onClick={e => e.stopPropagation()}>
                         <div className="aspect-video w-full h-full bg-black">
                             {renderPlayer()}
                         </div>
                    </div>
                </div>
            )}
            
            <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Sube tu Video">
                 <div onClick={triggerFileInput} className="text-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-12 cursor-pointer hover:border-primary dark:hover:bg-slate-900 transition-colors">
                    <i className="fas fa-cloud-upload-alt text-slate-400 dark:text-slate-500 text-5xl mb-4"></i>
                    <p className="mt-4 text-muted-foreground dark:text-slate-400">Arrastra y suelta tu video aquí o <span className="font-semibold text-primary">haz clic para seleccionar</span>.</p>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="video/*" />
                 </div>
                 <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 text-center">Soporta MP4, WEBM, OGG, y otros formatos de video comunes.</p>
            </Modal>
        </div>
    );
};

export default Videos;