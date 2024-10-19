import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Share2, Clipboard, Twitter, Facebook, Linkedin } from 'lucide-react';
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton } from 'react-share';

const SharePage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [visitCount, setVisitCount] = useState(0);
  const shareUrl = `${window.location.origin}/?ref=${code}`;

  useEffect(() => {
    // Simulate visit count increase
    const interval = setInterval(() => {
      setVisitCount((prevCount) => (prevCount < 10 ? prevCount + 1 : prevCount));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-orange-600 mb-6">Share Kyurations</h1>
      <p className="text-xl text-gray-700 mb-8">
        You're on the waitlist! Share your unique link to move up the queue.
      </p>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <p className="text-2xl font-semibold text-orange-500 mb-4">
          {visitCount} / 10 visits
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
          <div 
            className="bg-orange-600 h-2.5 rounded-full" 
            style={{ width: `${(visitCount / 10) * 100}%` }}
          ></div>
        </div>
        <p className="text-gray-600">
          {visitCount >= 10 
            ? "Congratulations! You're officially on the waitlist." 
            : `${10 - visitCount} more visits needed to secure your spot!`}
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Share your link:</h2>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <input 
            type="text" 
            value={shareUrl} 
            readOnly 
            className="flex-grow p-2 border rounded"
          />
          <button 
            onClick={copyToClipboard}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center"
          >
            <Clipboard className="mr-2" /> Copy
          </button>
        </div>
        <div className="flex justify-center space-x-4">
          <TwitterShareButton url={shareUrl} title="Join me on the Kyurations waitlist!">
            <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center">
              <Twitter className="mr-2" /> Twitter
            </button>
          </TwitterShareButton>
          <FacebookShareButton url={shareUrl} quote="Join me on the Kyurations waitlist!">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center">
              <Facebook className="mr-2" /> Facebook
            </button>
          </FacebookShareButton>
          <LinkedinShareButton url={shareUrl} title="Join me on the Kyurations waitlist!">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center">
              <Linkedin className="mr-2" /> LinkedIn
            </button>
          </LinkedinShareButton>
        </div>
      </div>
      <div className="text-left max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why share Kyurations?</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Be among the first to experience AI-powered content curation</li>
          <li>Help shape the future of knowledge management</li>
          <li>Get early access to premium features</li>
          <li>Join a community of forward-thinking content enthusiasts</li>
        </ul>
      </div>
    </div>
  );
};

export default SharePage;