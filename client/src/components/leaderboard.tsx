"use client"

import React from "react";

interface LeaderboardEntry {
    username: string;
    correctAnswers: number;
    wrongAnswers: number;
}

interface game_id {
    id: string
}

const Leaderboard = ({ id }: game_id) => {
    const [leaderboardData, setLeaderboardData] = React.useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/game/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setLeaderboardData(data.games);
                setLoading(false);
            });
    }, [id]);
    
    const sortedData = leaderboardData.sort((a, b) => b.correctAnswers - a.correctAnswers);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left text-gray-600 font-medium">Name</th>
                        <th className="px-4 py-2 text-left text-gray-600 font-medium">Correct Answers</th>
                        <th className="px-4 py-2 text-left text-gray-600 font-medium">Wrong Answers</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((entry, index) => (
                        <tr
                            key={index}
                            className={`${
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            } hover:bg-gray-100`}
                        >
                            <td className="px-4 py-2 border-b border-gray-300">{entry.username}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{entry.correctAnswers}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{entry.wrongAnswers}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;