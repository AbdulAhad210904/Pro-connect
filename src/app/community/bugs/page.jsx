"use client";
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBugReport } from '@/store/bug-reports/bugThunk'; // Adjust the path as needed
import { FileIcon } from 'lucide-react';

export default function FeatureReportPage() {
  const [description, setDescription] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.bugs);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !file) {
      alert('Bugbeschrijving en screenshot zijn verplicht.');
      return;
    }

    const bugData = {
      description,
      additionalInfo: additionalNotes,
      bugScreenshots: [file],
    };

    try {
      await dispatch(createBugReport(bugData)).unwrap();
      alert('Bugrapport succesvol ingediend!');
      setDescription('');
      setAdditionalNotes('');
      setFile(null);
    } catch (err) {
      alert(`Fout bij het indienen van bugrapport: ${err}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-[#27aae2] py-16 sm:py-24 px-4 relative w-full overflow-hidden">
        <div className="hidden xl:flex absolute left-0 top-[27%] -translate-y-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />
        <div className="hidden xl:flex absolute right-[-30%] bottom-[-155%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-black/10 z-0" />
        <div className="relative z-10 mx-auto text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12">Bugrapportage</h1>
          <h2 className="text-lg md:text-lg mb-6 sm:mb-8 lg:mb-12">
            Als u problemen of bugs bent tegengekomen tijdens het gebruik van Pro-Connect, kunt u deze hier melden. 
            Jouw feedback helpt ons het platform te verbeteren
          </h2>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="description" className="block text-xl font-medium">
              Bugbeschrijving:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent min-h-[200px] resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xl font-medium">
              Screenshot van het probleem:
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging ? 'border-[#27aae2] bg-[#27aae2]/5' : 'border-gray-300'
              }`}
            >
              <input
                type="file"
                id="screenshot"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="screenshot"
                className="flex flex-col items-center gap-4 cursor-pointer"
              >
                <FileIcon className="w-12 h-12 text-[#27aae2]" />
                <div className="text-gray-600">
                  {file ? (
                    <span>{file.name}</span>
                  ) : (
                    <span>
                      Drag & drop een bestand of{' '}
                      <span className="text-[#27aae2]">bladeren</span>
                    </span>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="block text-xl font-medium">
              Aanvullende opmerkingen:
            </label>
            <textarea
              id="notes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent min-h-[150px] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-[#27aae2] text-white rounded-lg hover:bg-[#2299cc] transition-colors duration-200"
            disabled={loading}
          >
            {loading ? 'Indienen...' : 'Indienen'}
          </button>

          {error && <p className="text-red-600 mt-4">Fout: {error}</p>}
        </form>
      </main>
    </div>
  );
}