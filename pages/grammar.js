import React, { useState } from 'react';
import NumberToHiligaynonText from '../components/number';


const Grammar = () => {
    const topics = [
        { id: 1, title: '1. Introduction', content: () => <p>Brief overview of the language, importance of documentation, audience.</p> },
        { id: 2, title: '2. Language Basics', content: () => <p>Alphabet, pronunciation, grammar basics, common phrases, numerals.</p> },
        { id: 3, title: '3. Vocabulary', content: () => <p>Common words and phrases, categories, idioms and expressions.</p> },
        { id: 4, title: '4. Writing System', content: () => <p>Script or writing system used, how to write characters, calligraphy.</p> },
        { id: 5, title: '5. Language Variation and Dialects', content: () => <p>Regional variations, differences in vocabulary, pronunciation, and grammar.</p> },
        { id: 6, title: '6. Cultural Context', content: () => <p>Cultural nuances, customs related to language use, proverbs, folklore.</p> },
        { id: 7, title: '7. Language Learning Resources', content: () => <p>Recommended books, websites, apps, courses, language exchange opportunities.</p> },
        { id: 8, title: '8. Advanced Topics', content: () => <p>Advanced grammar rules, literary forms, historical evolution.</p> },
        { id: 9, title: '9. Language Maintenance and Preservation', content: () => <p>Initiatives for preservation, importance for culture and identity.</p> },
        { id: 10, title: '10. Number System', content: () => <NumberToHiligaynonText/> },
        { id: 11, title: '11. Appendix', content: () => (
            <div>
                <p>Glossary, <i>additional resources,</i> acknowledgments.</p>
            </div>
        )},
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
                        {selectedTopic.content()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Grammar;
