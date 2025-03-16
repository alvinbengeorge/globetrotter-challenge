"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

const Dialog: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-black relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};

const MenuPage: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [gameCode, setGameCode] = useState('');
    const router = useRouter();

    const handleJoinGame = () => {
        if (gameCode.trim()) {
            router.push(`/game?game=${gameCode}`);
        } else {
            alert('Please enter a valid game code.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2">
            <h1 className="text-4xl font-bold mb-8">Globetrotter Challenge</h1>
            <div className="grid place-items-center grid-cols-2 gap-2">
                <Link
                    href="/game/"
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-lg font-semibold shadow-md transition duration-300 h-full grid place-items-center"
                >
                    Start New Game
                </Link>
                <button
                    onClick={() => setIsDialogOpen(true)}
                    className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-lg font-semibold shadow-md transition duration-300 h-full grid place-items-center"
                >
                    Join Existing Game
                </button>
            </div>
            <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <h2 className="text-xl font-bold mb-4">Enter Game Code</h2>
                <input
                    type="text"
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full mb-4"
                    placeholder="Game Code"
                />
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => setIsDialogOpen(false)}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleJoinGame}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                        Join
                    </button>
                </div>
            </Dialog>
        </div>
    );
};

export default MenuPage;