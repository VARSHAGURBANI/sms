// src/components/DocumentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DocumentList.css';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('/api/documents');
                setDocuments(response.data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocuments();
    }, []);

    return (
        <div className="document-list">
            <h1>Documents</h1>
            <table>
                <thead>
                    <tr>
                        <th>Document ID</th>
                        <th>Application ID</th>
                        <th>Document Type</th>
                        <th>File Path</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map(document => (
                        <tr key={document._id}>
                            <td>{document.DocumentID}</td>
                            <td>{document.ApplicationID}</td>
                            <td>{document.DocumentType}</td>
                            <td><a href={document.FilePath} target="_blank" rel="noopener noreferrer">View Document</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DocumentList;
