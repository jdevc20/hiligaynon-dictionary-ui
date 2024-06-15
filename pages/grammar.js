import React, { useState } from 'react';

const Grammar = () => {
    const topics = [
        { id: 1, title: 'Introduction', content: 'Brief overview of the language, importance of documentation, audience.' },
        { id: 2, title: 'Language Basics', content: 'Alphabet, pronunciation, grammar basics, common phrases, numerals.' },
        { id: 3, title: 'Vocabulary', content: 'Common words and phrases, categories, idioms and expressions.' },
        { id: 4, title: 'Writing System', content: 'Script or writing system used, how to write characters, calligraphy.' },
        { id: 5, title: 'Language Variation and Dialects', content: 'Regional variations, differences in vocabulary, pronunciation, and grammar.' },
        { id: 6, title: 'Cultural Context', content: 'Cultural nuances, customs related to language use, proverbs, folklore.' },
        { id: 7, title: 'Language Learning Resources', content: 'Recommended books, websites, apps, courses, language exchange opportunities.' },
        { id: 8, title: 'Advanced Topics', content: 'Advanced grammar rules, literary forms, historical evolution.' },
        { id: 9, title: 'Language Maintenance and Preservation', content: 'Initiatives for preservation, importance for culture and identity.' },
        { id: 10, title: 'Appendix', content: '<p>Glossary, <i>additional resources,</i> acknowledgments.</p>' } // Example with rich text content
    ];

    const [selectedTopic, setSelectedTopic] = useState(topics[0]);

    return (
        <div className="container page">
            <div className="row">
                {/* Sidebar */}
                <div className="d-lg-none mb-3">
                    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                        Open Sidebar
                    </button>
                </div>
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasSidebar" aria-labelledby="offcanvasSidebarLabel">
                    {/* Sidebar Header */}
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasSidebarLabel">Grammar Topics</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    {/* Sidebar Body */}
                    <div className="offcanvas-body">
                        <ul className="list-group">
                            {topics.map(topic => (
                                <li
                                    key={topic.id}
                                    className={`list-group-item list-group-item-action ${selectedTopic.id === topic.id ? 'active' : ''}`}
                                    onClick={() => setSelectedTopic(topic)}
                                >
                                    {topic.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sidebar for larger screens */}
                <div className="col-lg-3 d-none d-lg-block">
                    <div className="bg-light p-3 rounded">
                        <h2 className="h5">Grammar Topics</h2>
                        <ul className="list-group">
                            {topics.map(topic => (
                                <li
                                    key={topic.id}
                                    className={`list-group-item list-group-item-action ${selectedTopic.id === topic.id ? 'active' : ''}`}
                                    onClick={() => setSelectedTopic(topic)}
                                >
                                    {topic.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-lg-9 col-sm-12">
                    <div className="content">
                        <h2>{selectedTopic.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: selectedTopic.content }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Grammar;
