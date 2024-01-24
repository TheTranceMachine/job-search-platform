function Tabs() {
    const [activeTab, setActiveTab] = React.useState('');

    return (
        <div>
            <div>
                <button className={`tab ${activeTab === 'html' ? 'active' : ''}`} onClick={() => setActiveTab('html')}>HTML</button>
                <button className={`tab ${activeTab === 'css' ? 'active' : ''}`} onClick={() => setActiveTab('css')}>CSS</button>
                <button className={`tab ${activeTab === 'js' ? 'active' : ''}`} onClick={() => setActiveTab('js')}>JavaScript</button>
            </div>
            <div>
                {activeTab === 'html' && (
                    <p>
                        The HyperText Markup Language or HTML is the
                        standard markup language for documents designed to
                        be displayed in a web browser.
                    </p>
                )}
                {activeTab === 'css' && (
                    <p>
                        Cascading Style Sheets is a style sheet language
                        used for describing the presentation of a document
                        written in a markup language such as HTML or XML.
                    </p>
                )}
                {activeTab === 'js' && (
                    <p>
                        JavaScript, often abbreviated as JS, is a
                        programming language that is one of the core
                        technologies of the World Wide Web, alongside HTML
                        and CSS.
                    </p>
                )}
            </div>
        </div>
    );
}