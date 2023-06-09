import React, { useState } from 'react';

const CreateMessage: React.FC = () => {
    const [channelId, setChannelId] = useState('');
    const [userId, setUserId] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleCreateMessage = async () => {
        // 入力値のバリデーション
        if (!channelId || !userId || !content) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('https://curriculum-3-muta-yuichiro-hackathon-eaq52kewiq-uc.a.run.app/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    channelId: channelId,
                    userId: userId,
                    content: content
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                setError(errorResponse.error);
                return;
            }

            // メッセージ作成成功
            setError('');
            setChannelId('');
            setUserId('');
            setContent('');
        } catch (error) {
            setError('Failed to create message');
        }
    };

    return (
        <div>
            <h2>Create Message</h2>
            {error && <p>Error: {error}</p>}
            <form>
                <div>
                    <label htmlFor="channelId">Channel ID:</label>
                    <input
                        type="text"
                        id="channelId"
                        value={channelId}
                        onChange={(e) => setChannelId(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="userId">User ID:</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <input
                        type="text"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleCreateMessage}>
                    Create Message
                </button>
            </form>
        </div>
    );
};

export default CreateMessage;
