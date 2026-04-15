import React, { useState, useMemo, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// --- DATASET (Clean, no hardcoded image paths) ---
const mcuData = [
  { id: 1, title: "Captain America: The First Avenger", type: "Movie", releaseDate: "2011-07-22", chronoYear: "1942", phase: 1, saga: "Infinity Saga", isCore: false },
  { id: 2, title: "Captain Marvel", type: "Movie", releaseDate: "2019-03-08", chronoYear: "1995", phase: 3, saga: "Infinity Saga", isCore: false },
  { id: 3, title: "Iron Man", type: "Movie", releaseDate: "2008-05-02", chronoYear: "2008", phase: 1, saga: "Infinity Saga", isCore: true },
  { id: 4, title: "Iron Man 2", type: "Movie", releaseDate: "2010-05-07", chronoYear: "2010", phase: 1, saga: "Infinity Saga", isCore: false },
  { id: 5, title: "The Incredible Hulk", type: "Movie", releaseDate: "2008-06-13", chronoYear: "2010", phase: 1, saga: "Infinity Saga", isCore: false },
  { id: 6, title: "Thor", type: "Movie", releaseDate: "2011-05-06", chronoYear: "2011", phase: 1, saga: "Infinity Saga", isCore: false },
  { id: 7, title: "The Avengers", type: "Movie", releaseDate: "2012-05-04", chronoYear: "2012", phase: 1, saga: "Infinity Saga", isCore: true },
  { id: 8, title: "Loki (Season 1 & 2)", type: "TV Show", releaseDate: "2021-06-09", chronoYear: "Outside Time", phase: 4, saga: "Multiverse Saga", isCore: true },
  { id: 9, title: "Iron Man 3", type: "Movie", releaseDate: "2013-05-03", chronoYear: "2012", phase: 2, saga: "Infinity Saga", isCore: false },
  { id: 10, title: "Thor: The Dark World", type: "Movie", releaseDate: "2013-11-08", chronoYear: "2013", phase: 2, saga: "Infinity Saga", isCore: false },
  { id: 11, title: "Captain America: The Winter Soldier", type: "Movie", releaseDate: "2014-04-04", chronoYear: "2014", phase: 2, saga: "Infinity Saga", isCore: true },
  { id: 12, title: "Guardians of the Galaxy", type: "Movie", releaseDate: "2014-08-01", chronoYear: "2014", phase: 2, saga: "Infinity Saga", isCore: true },
  { id: 13, title: "Guardians of the Galaxy Vol. 2", type: "Movie", releaseDate: "2017-05-05", chronoYear: "2014", phase: 3, saga: "Infinity Saga", isCore: false },
  { id: 14, title: "Avengers: Age of Ultron", type: "Movie", releaseDate: "2015-05-01", chronoYear: "2015", phase: 2, saga: "Infinity Saga", isCore: true },
  { id: 15, title: "Ant-Man", type: "Movie", releaseDate: "2015-07-17", chronoYear: "2015", phase: 2, saga: "Infinity Saga", isCore: false },
  { id: 16, title: "Captain America: Civil War", type: "Movie", releaseDate: "2016-05-06", chronoYear: "2016", phase: 3, saga: "Infinity Saga", isCore: true },
  { id: 17, title: "Black Widow", type: "Movie", releaseDate: "2021-07-09", chronoYear: "2016", phase: 4, saga: "Multiverse Saga", isCore: false },
  { id: 18, title: "Black Panther", type: "Movie", releaseDate: "2018-02-16", chronoYear: "2016", phase: 3, saga: "Infinity Saga", isCore: false },
  { id: 19, title: "Spider-Man: Homecoming", type: "Movie", releaseDate: "2017-07-07", chronoYear: "2016", phase: 3, saga: "Infinity Saga", isCore: false },
  { id: 20, title: "Doctor Strange", type: "Movie", releaseDate: "2016-11-04", chronoYear: "2016", phase: 3, saga: "Infinity Saga", isCore: false },
  { id: 21, title: "Thor: Ragnarok", type: "Movie", releaseDate: "2017-11-03", chronoYear: "2017", phase: 3, saga: "Infinity Saga", isCore: true },
  { id: 22, title: "Ant-Man and the Wasp", type: "Movie", releaseDate: "2018-07-06", chronoYear: "2018", phase: 3, saga: "Infinity Saga", isCore: false },
  { id: 23, title: "Avengers: Infinity War", type: "Movie", releaseDate: "2018-04-27", chronoYear: "2018", phase: 3, saga: "Infinity Saga", isCore: true },
  { id: 24, title: "Avengers: Endgame", type: "Movie", releaseDate: "2019-04-26", chronoYear: "2018-2023", phase: 3, saga: "Infinity Saga", isCore: true },
  { id: 25, title: "WandaVision", type: "TV Show", releaseDate: "2021-01-15", chronoYear: "2023", phase: 4, saga: "Multiverse Saga", isCore: true },
  { id: 26, title: "The Falcon and the Winter Soldier", type: "TV Show", releaseDate: "2021-03-19", chronoYear: "2023", phase: 4, saga: "Multiverse Saga", isCore: false },
  { id: 27, title: "Shang-Chi and the Legend of the Ten Rings", type: "Movie", releaseDate: "2021-09-03", chronoYear: "2024", phase: 4, saga: "Multiverse Saga", isCore: false },
  { id: 28, title: "Eternals", type: "Movie", releaseDate: "2021-11-05", chronoYear: "2024", phase: 4, saga: "Multiverse Saga", isCore: false },
  { id: 29, title: "Spider-Man: Far From Home", type: "Movie", releaseDate: "2019-07-02", chronoYear: "2024", phase: 3, saga: "Infinity Saga", isCore: false },
  { id: 30, title: "Spider-Man: No Way Home", type: "Movie", releaseDate: "2021-12-17", chronoYear: "2024", phase: 4, saga: "Multiverse Saga", isCore: true },
  { id: 31, title: "Doctor Strange in the Multiverse of Madness", type: "Movie", releaseDate: "2022-05-06", chronoYear: "2024", phase: 4, saga: "Multiverse Saga", isCore: true },
  { id: 32, title: "Hawkeye", type: "TV Show", releaseDate: "2021-11-24", chronoYear: "2024", phase: 4, saga: "Multiverse Saga", isCore: false },
  { id: 33, title: "Moon Knight", type: "TV Show", releaseDate: "2022-03-30", chronoYear: "2025", phase: 4, saga: "Multiverse Saga", isCore: false },
  { id: 34, title: "Black Panther: Wakanda Forever", type: "Movie", releaseDate: "2022-11-11", chronoYear: "2025", phase: 4, saga: "Multiverse Saga", isCore: false },
  { id: 35, title: "Echo", type: "TV Show", releaseDate: "2024-01-09", chronoYear: "2025", phase: 5, saga: "Multiverse Saga", isCore: false },
  { id: 36, title: "She-Hulk: Attorney at Law", type: "TV Show", releaseDate: "2022-08-18", chronoYear: "2025", phase: 4, saga: "Multiverse Saga", isCore: false },
  { id: 37, title: "Ms. Marvel", type: "TV Show", releaseDate: "2022-06-08", chronoYear: "2025", phase: 4, saga: "Multiverse Saga", isCore: false },
  { id: 38, title: "Thor: Love and Thunder", type: "Movie", releaseDate: "2022-07-08", chronoYear: "2025", phase: 4, saga: "Multiverse Saga", isCore: false },
  { id: 39, title: "Ant-Man and the Wasp: Quantumania", type: "Movie", releaseDate: "2023-02-17", chronoYear: "2026", phase: 5, saga: "Multiverse Saga", isCore: false },
  { id: 40, title: "Guardians of the Galaxy Vol. 3", type: "Movie", releaseDate: "2023-05-05", chronoYear: "2026", phase: 5, saga: "Multiverse Saga", isCore: false },
  { id: 41, title: "Secret Invasion", type: "TV Show", releaseDate: "2023-06-21", chronoYear: "2026", phase: 5, saga: "Multiverse Saga", isCore: false },
  { id: 42, title: "The Marvels", type: "Movie", releaseDate: "2023-11-10", chronoYear: "2026", phase: 5, saga: "Multiverse Saga", isCore: false },
  { id: 43, title: "Deadpool & Wolverine", type: "Movie", releaseDate: "2024-07-26", chronoYear: "Outside Time", phase: 5, saga: "Multiverse Saga", isCore: true },
  { id: 44, title: "Agatha All Along", type: "TV Show", releaseDate: "2024-09-18", chronoYear: "2026", phase: 5, saga: "Multiverse Saga", isCore: false },
  { id: 45, title: "Captain America: Brave New World", type: "Movie", releaseDate: "2025-02-14", chronoYear: "2027", phase: 5, saga: "Multiverse Saga", isCore: false },
  { id: 46, title: "Thunderbolts*", type: "Movie", releaseDate: "2025-05-02", chronoYear: "2027", phase: 5, saga: "Multiverse Saga", isCore: false },
  { id: 47, title: "The Fantastic Four: First Steps", type: "Movie", releaseDate: "2025-07-25", chronoYear: "1960s (Alternate Universe)", phase: 6, saga: "Multiverse Saga", isCore: false },
  { id: 48, title: "Wonder Man", type: "TV Show", releaseDate: "2026-01-27", chronoYear: "2027", phase: 6, saga: "Multiverse Saga", isCore: false },
  { id: 49, title: "Daredevil: Born Again", type: "TV Show", releaseDate: "2026-03-24", chronoYear: "2027", phase: 6, saga: "Multiverse Saga", isCore: false },
  { id: 50, title: "Spider-Man: Brand New Day", type: "Movie", releaseDate: "2026-07-31", chronoYear: "2027", phase: 6, saga: "Multiverse Saga", isCore: true },
  { id: 51, title: "Avengers: Doomsday", type: "Movie", releaseDate: "2026-12-18", chronoYear: "2027", phase: 6, saga: "Multiverse Saga", isCore: true },
  { id: 52, title: "Avengers: Secret Wars", type: "Movie", releaseDate: "2027-12-17", chronoYear: "2028", phase: 6, saga: "Multiverse Saga", isCore: true }
];

// --- HELPER FUNCTIONS ---
const getChronoSortValue = (chronoString) => {
  if (chronoString === "Outside Time") return 9999;
  const match = chronoString.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
};

const formatFullDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatReleaseMonth = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
};

// --- GLOBAL ASSET CACHE & FETCH LOCK ---
const tmdbCache = {};
const activeFetches = {};

// --- CUSTOM HOOK: 3-Step TMDB Fetch (Poster, Logo, Trailer) ---
const useTMDBAssets = (title, type, id = 0) => {
  const [assets, setAssets] = useState(tmdbCache[title] || { posterUrl: null, logoUrl: null, trailerUrl: null });

  useEffect(() => {
    if (!title) return;

    if (tmdbCache[title]) {
      setAssets(tmdbCache[title]);
      return;
    }

    const fetchAssets = async () => {
      if (activeFetches[title]) {
        const res = await activeFetches[title];
        if (res) setAssets(res);
        return;
      }

      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const cleanTitle = title.split(' (')[0]; 
      const shortTitle = cleanTitle.length > 25 ? cleanTitle.substring(0, 22) + "..." : cleanTitle;
      const fallbackPoster = `https://placehold.co/300x450/1e293b/a855f7?text=${encodeURIComponent(shortTitle)}`;

      if (!apiKey) {
        setAssets({ posterUrl: fallbackPoster, logoUrl: null, trailerUrl: null });
        return;
      }

      const fetchPromise = (async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, id * 60));

          const searchType = type === 'TV Show' ? 'tv' : 'movie';
          const searchUrl = `https://api.themoviedb.org/3/search/${searchType}?api_key=${apiKey}&query=${encodeURIComponent(cleanTitle)}`;
          
          const searchRes = await fetch(searchUrl);
          const searchData = await searchRes.json();

          if (searchData.results && searchData.results.length > 0) {
            const result = searchData.results[0];
            const poster = result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : fallbackPoster;
            const tmdbId = result.id;

            const detailUrl = `https://api.themoviedb.org/3/${searchType}/${tmdbId}?api_key=${apiKey}&append_to_response=images,videos&include_image_language=en,null`;
            const detailRes = await fetch(detailUrl);
            const detailData = await detailRes.json();

            let logo = null;
            if (detailData.images && detailData.images.logos && detailData.images.logos.length > 0) {
              const enLogo = detailData.images.logos.find(l => l.iso_639_1 === 'en');
              const selectedLogo = enLogo || detailData.images.logos[0];
              logo = `https://image.tmdb.org/t/p/w500${selectedLogo.file_path}`;
            }

            let trailer = null;
            if (detailData.videos && detailData.videos.results && detailData.videos.results.length > 0) {
              const foundTrailer = detailData.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
              if (foundTrailer) {
                trailer = `https://www.youtube.com/watch?v=${foundTrailer.key}`;
              }
            }

            return { posterUrl: poster, logoUrl: logo, trailerUrl: trailer };
          } else {
            return { posterUrl: fallbackPoster, logoUrl: null, trailerUrl: null };
          }
        } catch (error) {
          console.error("TMDB Fetch Failed:", error);
          return { posterUrl: fallbackPoster, logoUrl: null, trailerUrl: null };
        }
      })();

      activeFetches[title] = fetchPromise;
      const result = await fetchPromise;
      
      tmdbCache[title] = result; 
      setAssets(result);
    };

    fetchAssets();
  }, [title, type, id]);

  return assets;
};

// --- COMPONENTS ---

// Custom Local Title Logo Component
const MCUTitleLogo = () => {
  return (
    <div className="flex flex-col items-start select-none">
      <img 
        src="/marvelcinematicuniverse.png" 
        alt="Marvel Cinematic Universe" 
        // Re-scaled to properly align with the TIMELINE text below it
        className="h-12 md:h-16 object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
      />
      <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-400 to-red-600 tracking-[0.2em] uppercase mt-1 pl-1">
        Timeline
      </h2>
    </div>
  );
};

const ItemModal = ({ item, onClose }) => {
  const { posterUrl, logoUrl, trailerUrl } = useTMDBAssets(item?.title, item?.type, item?.id);

  useEffect(() => {
    if (item) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity" onClick={onClose}>
      <div 
        className={`relative w-full max-w-4xl bg-slate-900 border rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] max-h-[90vh] flex flex-col md:flex-row
        ${item.isCore ? 'border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.2)]' : 'border-slate-700'}`}
        onClick={(e) => e.stopPropagation()} 
      >
        {posterUrl && (
          <div 
            className="absolute inset-0 opacity-20 z-0 pointer-events-none"
            style={{ backgroundImage: `url(${posterUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px)' }}
          ></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/40 z-0 pointer-events-none"></div>

        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-20">✕</button>
        
        <div className="relative z-10 flex flex-col md:flex-row w-full p-6 md:p-8 gap-8 overflow-y-auto">
          <div className="w-full md:w-1/3 shrink-0 flex flex-col gap-4">
            {posterUrl ? (
              <img src={posterUrl} alt={item.title} className="w-full h-auto rounded-xl shadow-2xl border border-slate-700/50 object-cover aspect-[2/3]" />
            ) : (
              <div className="w-full rounded-xl shadow-2xl border border-slate-700/50 bg-slate-800 animate-pulse aspect-[2/3]"></div>
            )}
            
            {trailerUrl && (
              <a href={trailerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                Watch Trailer
              </a>
            )}
          </div>
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${item.type === 'Movie' ? 'bg-cyan-900/60 text-cyan-400' : 'bg-emerald-900/60 text-emerald-400'}`}>{item.type}</span>
                <span className="text-xs font-bold px-2 py-1 rounded bg-slate-800/80 text-slate-300 uppercase tracking-wider border border-slate-700">Phase {item.phase}</span>
                {item.isCore && <span className="text-xs font-bold px-2 py-1 rounded bg-purple-900/60 text-purple-400 uppercase tracking-wider border border-purple-500/30">Core Story</span>}
              </div>
              
              {logoUrl ? (
                <img src={logoUrl} alt={item.title} className="max-h-20 md:max-h-24 object-contain object-left mb-2 drop-shadow-lg" />
              ) : (
                <h2 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight drop-shadow-lg">{item.title}</h2>
              )}
              
              <p className="text-lg text-slate-300 font-medium">{item.saga}</p>
            </div>
            <div className="space-y-6">
              <div className="bg-slate-950/60 backdrop-blur-sm rounded-xl p-5 border border-slate-800/50">
                <h3 className="text-sm uppercase tracking-widest font-bold text-slate-400 mb-2">Fictional Synopsis</h3>
                <p className="text-slate-200 leading-relaxed">
                  Experience the events of <strong>{item.title}</strong> as they unfold within the {item.saga}. Set predominantly in the year {item.chronoYear}, this {item.type.toLowerCase()} pushes the boundaries of Phase {item.phase} and leaves lasting consequences across the timeline.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                  <span className="block text-slate-400 text-xs uppercase tracking-wider mb-1">Theatrical Release</span>
                  <span className="text-white font-mono text-lg">{formatFullDate(item.releaseDate)}</span>
                </div>
                <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                  <span className="block text-slate-400 text-xs uppercase tracking-wider mb-1">Timeline Placement</span>
                  <span className="text-cyan-400 font-mono text-lg font-bold">{item.chronoYear}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineCardStandard = ({ item, onClick }) => {
  const { posterUrl, logoUrl } = useTMDBAssets(item.title, item.type, item.id);

  return (
    <div 
      onClick={() => onClick(item)}
      // Updated hover:scale to 1.15 (15% increase) to prevent the card from becoming massive on the screen
      className={`group cursor-pointer relative rounded-xl border backdrop-blur-sm transition-all duration-500 ease-out hover:scale-[1.15] hover:-translate-y-3 hover:z-[100] hover:shadow-[0_15px_40px_rgba(168,85,247,0.6)] h-full w-full overflow-hidden origin-center
      ${item.isCore ? 'border-purple-500 bg-purple-900/20' : 'border-slate-700 bg-slate-800/40'}`}
    >
      {posterUrl && (
        <div 
          className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-0 pointer-events-none"
          style={{ backgroundImage: `url(${posterUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(10px)' }}
        ></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/40 z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-row gap-5 p-4 h-full w-full">
        <div className="w-[40%] shrink-0">
          {posterUrl ? (
            <img src={posterUrl} alt={item.title} className="w-full h-full rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.4)] border border-slate-700/50 object-cover aspect-[2/3] group-hover:opacity-100 transition-opacity" />
          ) : (
            <div className="w-full h-full rounded-lg shadow-md border border-slate-700/50 bg-slate-800 animate-pulse aspect-[2/3]"></div>
          )}
        </div>
        
        <div className="w-[60%] flex flex-col justify-between py-1">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${item.type === 'Movie' ? 'bg-cyan-900/80 text-cyan-300' : 'bg-emerald-900/80 text-emerald-300'}`}>{item.type}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 uppercase tracking-wider border border-slate-700">P{item.phase}</span>
              {item.isCore && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-900/80 text-purple-300 uppercase tracking-wider border border-purple-500/50">Core</span>}
            </div>
            
            {logoUrl ? (
              <img src={logoUrl} alt={item.title} className="h-12 object-contain object-left mb-1 drop-shadow-md" />
            ) : (
              <h3 className="text-lg md:text-xl font-black text-white leading-tight mb-1 group-hover:text-purple-300 transition-colors line-clamp-3 drop-shadow-md">{item.title}</h3>
            )}
            
            <p className="text-xs text-slate-300 font-medium mb-2">{item.saga}</p>
          </div>
          <div className="pt-3 border-t border-slate-700/50 flex flex-col gap-1 text-xs">
            <div className="flex justify-between items-end">
              <div>
                <span className="block text-slate-400 text-[10px] uppercase tracking-wider mb-0.5">Release Date</span>
                <span className="text-slate-100 font-mono text-sm font-semibold">{formatFullDate(item.releaseDate)}</span>
              </div>
              <div className="text-right">
                <span className="block text-slate-400 text-[10px] uppercase tracking-wider mb-0.5">Timeline</span>
                <span className="text-cyan-400 font-mono font-bold text-sm drop-shadow-sm">{item.chronoYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MCUTimelineApp() {
  const [selectedItem, setSelectedItem] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('chronoYear'); 
  const [groupBy, setGroupBy] = useState('Phase');    
  const [filterCore, setFilterCore] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [filterSaga, setFilterSaga] = useState('All');
  const [filterPhases, setFilterPhases] = useState([1, 2, 3, 4, 5, 6]);

  const handlePhaseToggle = (phase) => {
    setFilterPhases(prev => prev.includes(phase) ? prev.filter(p => p !== phase) : [...prev, phase]);
  };

  const processedData = useMemo(() => {
    let filtered = mcuData.filter(item => {
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        if (!item.title.toLowerCase().includes(query)) return false;
      }
      if (filterCore && !item.isCore) return false;
      if (filterType !== 'All' && item.type !== filterType) return false;
      if (filterSaga !== 'All' && item.saga !== filterSaga) return false;
      if (!filterPhases.includes(item.phase)) return false;
      return true;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'releaseDate') {
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      } else {
        const yearA = getChronoSortValue(a.chronoYear);
        const yearB = getChronoSortValue(b.chronoYear);
        if (yearA === yearB) return new Date(a.releaseDate) - new Date(b.releaseDate);
        return yearA - yearB;
      }
    });

    return filtered;
  }, [searchQuery, filterCore, filterType, filterSaga, filterPhases, sortBy]);

  let currentGroupTracker = null;

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-200 font-sans overflow-hidden selection:bg-purple-500/30">
      
      <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* FIXED TOP PANEL */}
      <div className="z-50 shrink-0 bg-slate-900 border-b border-slate-800 p-4 md:p-6 shadow-2xl overflow-y-auto max-h-[50vh] relative">
        <div className="absolute top-2 right-4 text-xs font-bold text-slate-500 uppercase tracking-widest hidden lg:block opacity-50">
          Scroll to Pan • Hold Shift to Zoom
        </div>

        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            <MCUTitleLogo />

            <div className="w-full md:max-w-md relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input type="text" placeholder="Search the Timeline..." className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl py-2 pl-12 pr-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-slate-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Organize</label>
              <div className="flex gap-2">
                <select className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none flex-1" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="chronoYear">By Timeline</option>
                  <option value="releaseDate">By Release</option>
                </select>
                <select className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none flex-1" value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                  <option value="Phase">Group Phase</option>
                  <option value="Saga">Group Saga</option>
                  <option value="None">No Groups</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Format & Saga</label>
              <div className="flex gap-2">
                <select className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none flex-1" value={filterType} onChange={(e) => setFilterType(e.target.value)}><option value="All">All Formats</option><option value="Movie">Movies</option><option value="TV Show">TV Shows</option></select>
                <select className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none flex-1" value={filterSaga} onChange={(e) => setFilterSaga(e.target.value)}><option value="All">All Sagas</option><option value="Infinity Saga">Infinity Saga</option><option value="Multiverse Saga">Multiverse Saga</option></select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 justify-center sm:pl-4">
              <label className="flex items-center gap-3 cursor-pointer group mt-4">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={filterCore} onChange={(e) => setFilterCore(e.target.checked)} />
                  <div className={`block w-12 h-6 rounded-full transition-colors ${filterCore ? 'bg-purple-600' : 'bg-slate-700'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${filterCore ? 'translate-x-6' : ''}`}></div>
                </div>
                <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Core Story Only</span>
              </label>
            </div>

            <div className="flex flex-col gap-1.5 lg:col-span-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Phases</label>
              <div className="flex flex-wrap gap-1">
                {[1, 2, 3, 4, 5, 6].map(phase => (
                  <label key={phase} className="cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={filterPhases.includes(phase)} onChange={() => handlePhaseToggle(phase)} />
                    <div className="w-7 h-7 flex items-center justify-center rounded bg-slate-800 border border-slate-700 text-xs font-bold text-slate-400 peer-checked:bg-cyan-900/50 peer-checked:text-cyan-400 peer-checked:border-cyan-500/50 hover:bg-slate-700 transition-all">{phase}</div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL INTERACTIVE CANVAS */}
      <div className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing bg-slate-950">
        
        {/* --- STATIC BACKGROUND STACK --- */}
        
        {/* LAYER 1: LOCAL NEBULA BACKGROUND IMAGE */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/nebula.jpg')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            mixBlendMode: 'lighten'
          }}
        ></div>

        {/* LAYER 2: Cosmic Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/70 via-slate-950/90 to-black pointer-events-none z-10"></div>
        
        {/* LAYER 3: Star Dots */}
        <div className="absolute inset-0 opacity-15 pointer-events-none z-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* TMDB ATTRIBUTION BADGE */}
        <div className="absolute bottom-6 left-6 z-40 max-w-[320px] text-xs text-slate-400 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-2xl pointer-events-auto hidden md:block">
          <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:text-slate-200 transition-colors">
            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB Logo" className="h-4" />
            <p className="leading-tight">This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
          </a>
        </div>

        <TransformWrapper
          initialScale={1}
          minScale={0.15}
          maxScale={3}    
          centerOnInit={false}
          wheel={{ 
            activationKeys: ["Shift"],
            step: 0.1 
          }}
          panning={{ 
            wheelPanning: true 
          }}
          doubleClick={{ disabled: true }} 
        >
          {({ zoomIn, zoomOut, resetTransform, centerView }) => (
            <>
              {/* Camera Controls */}
              <div className="absolute bottom-6 right-6 z-40 flex flex-col gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-2 rounded-2xl shadow-2xl pointer-events-auto">
                <button onClick={() => zoomIn()} className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 flex items-center justify-center text-xl font-bold transition-all shadow-md" title="Zoom In">+</button>
                <button onClick={() => centerView(0.2, 500)} className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs font-bold transition-all shadow-md text-slate-300" title="Fit to Screen">FIT</button>
                <button onClick={() => resetTransform()} className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs font-bold transition-all shadow-md text-slate-400" title="Reset Zoom">100%</button>
                <button onClick={() => zoomOut()} className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 hover:text-purple-400 flex items-center justify-center text-2xl font-bold transition-all shadow-md" title="Zoom Out">−</button>
              </div>

              <TransformComponent wrapperClass="!w-full !h-full relative z-30" contentClass="!w-max !h-full flex items-center pl-20 pr-40">
                <div className="relative flex flex-row items-center h-[750px] gap-x-0">
                  
                  {/* CONTINUOUS RULER GRAPHICS */}
                  <div className="absolute left-0 right-0 top-1/2 h-[3px] bg-slate-700 -translate-y-1/2 rounded-full z-0"></div>
                  <div className="absolute left-0 right-0 top-1/2 h-8 -translate-y-1/2 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 98px, #cbd5e1 98px, #cbd5e1 100px)', backgroundSize: '100px 100%' }}></div>
                  <div className="absolute left-0 right-0 top-1/2 h-4 -translate-y-1/2 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 18px, #cbd5e1 18px, #cbd5e1 20px)', backgroundSize: '20px 100%' }}></div>

                  {processedData.length === 0 ? (
                    <div className="text-center w-full px-40 text-slate-500 relative z-10"><p className="text-xl">No files found matching your search criteria.</p></div>
                  ) : (
                    processedData.map((item, index) => {
                      let showHeader = false;
                      let headerText = '';

                      if (groupBy === 'Phase') {
                        if (item.phase !== currentGroupTracker) {
                          showHeader = true; headerText = `Phase ${item.phase}`; currentGroupTracker = item.phase;
                        }
                      } else if (groupBy === 'Saga') {
                        if (item.saga !== currentGroupTracker) {
                          showHeader = true; headerText = item.saga; currentGroupTracker = item.saga;
                        }
                      }

                      return (
                        <React.Fragment key={item.id}>
                          {showHeader && (
                            <div className="relative z-20 shrink-0 mx-10">
                              <div className="bg-slate-950 border-2 border-purple-500 px-6 py-4 rounded-3xl shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                                <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 uppercase tracking-widest whitespace-nowrap">{headerText}</h2>
                              </div>
                            </div>
                          )}

                          <div className="relative z-10 flex flex-col items-center w-[480px] shrink-0 h-full justify-center">
                            
                            <div className="h-1/2 w-full flex items-end pb-16 px-6">
                              {index % 2 === 0 && <TimelineCardStandard item={item} onClick={setSelectedItem} />}
                            </div>

                            <div className="absolute top-1/2 left-1/2 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                              {index % 2 !== 0 && (
                                <div className="mb-3 flex flex-col items-center bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800 backdrop-blur-sm">
                                  <span className="block text-cyan-400 font-mono text-sm font-black tracking-widest">{item.chronoYear}</span>
                                  <span className="block text-slate-500 font-mono text-[9px] uppercase tracking-widest">{formatReleaseMonth(item.releaseDate)}</span>
                                </div>
                              )}

                              <div className="w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] border-[3px] border-slate-950"></div>

                              {index % 2 === 0 && (
                                <div className="mt-3 flex flex-col items-center bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800 backdrop-blur-sm">
                                  <span className="block text-cyan-400 font-mono text-sm font-black tracking-widest">{item.chronoYear}</span>
                                  <span className="block text-slate-500 font-mono text-[9px] uppercase tracking-widest">{formatReleaseMonth(item.releaseDate)}</span>
                                </div>
                              )}
                            </div>

                            <div className="h-1/2 w-full flex items-start pt-16 px-6">
                              {index % 2 !== 0 && <TimelineCardStandard item={item} onClick={setSelectedItem} />}
                            </div>
                            
                          </div>
                        </React.Fragment>
                      );
                    })
                  )}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}