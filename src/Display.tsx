import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

function Display({ statistics, onExit }) {
    if (Object.keys(statistics).length == 0) {
        return (
            <h1 className="text-indigo-500 text-center text-6xl font-bold">
                Loading...
            </h1>
        )
    } else {
        return (
            <div>
                <div className="mt-24 mb-12">
                <h1 className="text-indigo-500 text-center text-6xl font-bold">
                    {statistics.name}
                </h1>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div className="shadow p-4 col-span-2">
                        <p className="text-indigo-500 text-base font-medium uppercase leading-4">We have been writing to each other endlessly for</p>
                        <p className="text-black font-bold text-2xl inline-flex items-center space-x-2 mt-2">
                            <span>{statistics.total_days} days</span>
                        </p>
                    </div>
                    <div className="shadow p-4">
                        <p className="text-indigo-500 text-base font-medium uppercase leading-4">We sent each other</p>
                        <p className="text-black font-bold text-2xl inline-flex items-center space-x-2 mt-2">
                            <span>{statistics.total_messages} messages</span>
                        </p>
                    </div>
                    <div className="shadow p-4">
                        <p className="text-indigo-500 text-base font-medium uppercase leading-4">We called each other</p>
                        <p className="text-black font-bold text-2xl inline-flex items-center space-x-2 mt-2">
                            <span>{statistics.total_calls} times</span>
                        </p>
                    </div>
                    <div className="shadow p-4 col-span-2">
                        <p className="text-indigo-500 text-base font-medium uppercase leading-4">Our record is</p>
                        <p className="text-black font-bold text-2xl inline-flex items-center space-x-2 my-2">
                            <span>{statistics.top_day.count} messages on {statistics.top_day.date}</span>
                        </p>
                    </div>
                    <div className="shadow p-4 col-span-2">
                        <CalendarHeatmap
                            startDate={new Date(statistics.first_date)}
                            endDate={new Date(statistics.last_date)}
                            values={statistics.messages_per_day}
                            classForValue={(value) => {
                                if (!value) {
                                return 'fill-white';
                                }
                                const percentage = value.count / statistics.top_day.count;
                                if (percentage > 0.9) {
                                    return 'fill-indigo-900';
                                } else if (percentage > 0.8) {
                                    return 'fill-indigo-800';
                                } else if (percentage > 0.7) {
                                    return 'fill-indigo-700';
                                } else if (percentage > 0.6) {
                                    return 'fill-indigo-600';
                                } else if (percentage > 0.5) {
                                    return 'fill-indigo-500';
                                } else if (percentage > 0.4) {
                                    return 'fill-indigo-400';
                                } else if (percentage > 0.3) {
                                    return 'fill-indigo-300';
                                } else if (percentage > 0.2) {
                                    return 'fill-indigo-200';
                                } else if (percentage > 0.1) {
                                    return 'fill-indigo-100';
                                } else {
                                    return 'fill-indigo-50';
                                }
                            }}
                            titleForValue={(value) => {
                                if (!value) {
                                    return '0 messages';
                                }
                                return `${value.count} messages on ${value.date}`;
                            }}
                        />
                    </div>
                </div>
                <button onClick={() => onExit()} className="fixed bottom-4 right-4 uppercase shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white text-base py-3 px-6 rounded">
                    Back
                </button>
            </div>
        );
    }
  }
  
  export default Display;
  