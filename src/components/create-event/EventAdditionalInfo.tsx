import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Speaker {
  name: string;
  bio: string;
  topic: string;
}

interface Sponsor {
  name: string;
  level: string;
  logo?: string;
}

interface AgendaItem {
  time: string;
  title: string;
  description: string;
}

interface EventAdditionalInfoProps {
  data: {
    agenda: AgendaItem[];
    speakers: Speaker[];
    sponsors: Sponsor[];
  };
  onUpdate: (data: any) => void;
}

export default function EventAdditionalInfo({ data, onUpdate }: EventAdditionalInfoProps) {
  const [newAgendaItem, setNewAgendaItem] = useState<AgendaItem>({
    time: '',
    title: '',
    description: '',
  });

  const [newSpeaker, setNewSpeaker] = useState<Speaker>({
    name: '',
    bio: '',
    topic: '',
  });

  const [newSponsor, setNewSponsor] = useState<Sponsor>({
    name: '',
    level: '',
  });

  const handleAddAgendaItem = () => {
    if (newAgendaItem.time && newAgendaItem.title) {
      onUpdate({
        agenda: [...data.agenda, newAgendaItem],
      });
      setNewAgendaItem({ time: '', title: '', description: '' });
    }
  };

  const handleAddSpeaker = () => {
    if (newSpeaker.name && newSpeaker.topic) {
      onUpdate({
        speakers: [...data.speakers, newSpeaker],
      });
      setNewSpeaker({ name: '', bio: '', topic: '' });
    }
  };

  const handleAddSponsor = () => {
    if (newSponsor.name && newSponsor.level) {
      onUpdate({
        sponsors: [...data.sponsors, newSponsor],
      });
      setNewSponsor({ name: '', level: '' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Agenda Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Event Agenda</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="agendaTime" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                id="agendaTime"
                value={newAgendaItem.time}
                onChange={(e) => setNewAgendaItem({ ...newAgendaItem, time: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="agendaTitle" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="agendaTitle"
                value={newAgendaItem.title}
                onChange={(e) => setNewAgendaItem({ ...newAgendaItem, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="agendaDescription" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="agendaDescription"
              value={newAgendaItem.description}
              onChange={(e) => setNewAgendaItem({ ...newAgendaItem, description: e.target.value })}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleAddAgendaItem}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Agenda Item
          </button>
        </div>

        {data.agenda.length > 0 && (
          <div className="mt-4 space-y-2">
            {data.agenda.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200"
              >
                <div>
                  <div className="font-medium">{item.time} - {item.title}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdate({
                    agenda: data.agenda.filter((_, i) => i !== index),
                  })}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Speakers Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Speakers</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="speakerName" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="speakerName"
                value={newSpeaker.name}
                onChange={(e) => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="speakerTopic" className="block text-sm font-medium text-gray-700">
                Topic
              </label>
              <input
                type="text"
                id="speakerTopic"
                value={newSpeaker.topic}
                onChange={(e) => setNewSpeaker({ ...newSpeaker, topic: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="speakerBio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="speakerBio"
              value={newSpeaker.bio}
              onChange={(e) => setNewSpeaker({ ...newSpeaker, bio: e.target.value })}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleAddSpeaker}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Speaker
          </button>
        </div>

        {data.speakers.length > 0 && (
          <div className="mt-4 space-y-2">
            {data.speakers.map((speaker, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200"
              >
                <div>
                  <div className="font-medium">{speaker.name}</div>
                  <div className="text-sm text-indigo-600">{speaker.topic}</div>
                  <div className="text-sm text-gray-500">{speaker.bio}</div>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdate({
                    speakers: data.speakers.filter((_, i) => i !== index),
                  })}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sponsors Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sponsors</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="sponsorName" className="block text-sm font-medium text-gray-700">
                Sponsor Name
              </label>
              <input
                type="text"
                id="sponsorName"
                value={newSponsor.name}
                onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="sponsorLevel" className="block text-sm font-medium text-gray-700">
                Sponsorship Level
              </label>
              <select
                id="sponsorLevel"
                value={newSponsor.level}
                onChange={(e) => setNewSponsor({ ...newSponsor, level: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select level</option>
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddSponsor}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Sponsor
          </button>
        </div>

        {data.sponsors.length > 0 && (
          <div className="mt-4 space-y-2">
            {data.sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200"
              >
                <div>
                  <div className="font-medium">{sponsor.name}</div>
                  <div className="text-sm text-indigo-600">{sponsor.level} Sponsor</div>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdate({
                    sponsors: data.sponsors.filter((_, i) => i !== index),
                  })}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}