// src/components/DataBackup.js
import React from "react";

const DataBackup = () => {
    // ✅ Export function
    const handleExport = () => {
        const allData = {};

        // লোকাল স্টোরেজের সব কী পড়ুন
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            allData[key] = localStorage.getItem(key);
        }

        // JSON ডেটা blob আকারে তৈরি
        const blob = new Blob([JSON.stringify(allData, null, 2)], {
            type: "application/json",
        });

        // ডাউনলোড লিংক তৈরি
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "study-tracker-backup.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    // ✅ Import function
    const handleImport = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);

                // লোকালস্টোরেজ ক্লিয়ার করে ইমপোর্ট ডেটা সেট করুন
                localStorage.clear();
                for (const key in importedData) {
                    localStorage.setItem(key, importedData[key]);
                }

                alert("✅ ডেটা সফলভাবে ইমপোর্ট হয়েছে! পেজ রিফ্রেশ করুন।");
            } catch (error) {
                alert("❌ ফাইলটি সঠিক নয়!");
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="p-4 bg-white shadow rounded-2xl max-w-md mx-auto mt-10 text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">📦 Data Backup</h2>

            <button
                onClick={handleExport}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full mb-3"
            >
                ⬇️ Export My Data
            </button>

            <label className="cursor-pointer block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg w-full">
                ⬆️ Import My Data
                <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={handleImport}
                />
            </label>
        </div>
    );
};

export default DataBackup;
