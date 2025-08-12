import { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, Plus, Trash2, Edit2, MoreVertical } from 'lucide-react';

function UserNotes({ user }) {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Monthly Budget Planning',
      content: 'Track expenses and set budget goals for each category...',
      category: 'Finance',
      date: '2024-03-15',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Investment Ideas',
      content: 'Research potential investment opportunities...',
      category: 'Investment',
      date: '2024-03-14',
      color: 'green'
    },
    {
      id: 3,
      title: 'Business Contacts',
      content: 'Important contacts and meeting notes...',
      category: 'Business',
      date: '2024-03-13',
      color: 'purple'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'General',
    color: 'blue'
  });

  const handleCreateNote = () => {
    if (newNote.title && newNote.content) {
      setNotes([
        {
          id: notes.length + 1,
          ...newNote,
          date: new Date().toISOString().split('T')[0]
        },
        ...notes
      ]);
      setNewNote({
        title: '',
        content: '',
        category: 'General',
        color: 'blue'
      });
      setShowNewNoteForm(false);
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const colorClasses = {
    blue: 'bg-gray-900 border-blue-200',
    green: 'bg-gray-900 border-green-200',
    purple: 'bg-gray-900 border-purple-200',
    yellow: 'bg-yellow-50 border-green-200',
    red: 'bg-red-50 border-green-200'
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-500">Notes</h1>
        <p className="text-gray-500">Keep track of your important information</p>
      </div>

      {/* Search and Actions */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={() => setShowNewNoteForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus className="w-5 h-5" />
          <span>New Note</span>
        </button>
      </div>

      {/* New Note Form */}
      {showNewNoteForm && (
        <div className="mb-6 bg-gray-900 rounded-lg shadow-sm border border-gray-200 p-6">
          <input
            type="text"
            placeholder="Note title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="w-full mb-4 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <textarea
            placeholder="Note content"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            className="w-full mb-4 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
          />
          <div className="flex justify-between">
            <select
              value={newNote.category}
              onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900"
            >
              <option value="General">General</option>
              <option value="Finance">Finance</option>
              <option value="Business">Business</option>
              <option value="Personal">Personal</option>
            </select>
            <div className="space-x-2">
              <button
                onClick={() => setShowNewNoteForm(false)}
                className="px-4 py-2 text-green-700 hover:text-green-500"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNote}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`${colorClasses[note.color]} rounded-lg border p-6`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-green-500">{note.title}</h3>
              <div className="relative">
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-300 mb-4 line-clamp-3">{note.content}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">{note.date}</span>
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-blue-600">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

UserNotes.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired
};

export default UserNotes;