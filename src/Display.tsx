import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

import { Statistics } from './types.d';

function Display({ statistics, onExit }: { statistics: Statistics, onExit: () => void }) {

    const formatDate = (date: string): string => {
        const dateObj = new Date(date);
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options);
    }

    if (Object.keys(statistics).length == 0) {
        return (
            <h1 className="text-rose-500 text-center text-6xl font-bold">
                Loading...
            </h1>
        )
    } else {
        return (
            <div>
                <div className="mt-24 mb-12">
                <h1 className="text-rose-500 text-center text-6xl font-bold">
                    {statistics.name}
                </h1>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div className="shadow p-4 col-span-2">
                        <p className="text-rose-500 text-base font-medium uppercase leading-4">We have been writing to each other endlessly for</p>
                        <p className="text-gray-700 font-bold text-2xl inline-flex items-center space-x-2 mt-2">
                            <span>{statistics.total_days} days</span>
                        </p>
                    </div>
                    <div className="shadow p-4">
                        <p className="text-rose-500 text-base font-medium uppercase leading-4">We sent each other</p>
                        <p className="text-gray-700 font-bold text-2xl inline-flex items-center space-x-2 mt-2">
                            <span>{statistics.total_messages} messages</span>
                        </p>
                    </div>
                    <div className="shadow p-4">
                        <p className="text-rose-500 text-base font-medium uppercase leading-4">We called each other</p>
                        <p className="text-gray-700 font-bold text-2xl inline-flex items-center space-x-2 mt-2">
                            <span>{statistics.total_calls} times</span>
                        </p>
                    </div>
                    <div className="shadow p-4 col-span-2">
                        <p className="text-rose-500 text-base font-medium uppercase leading-4">Our record is</p>
                        <p className="text-gray-700 font-bold text-2xl inline-flex items-center space-x-2 my-2">
                            <span>{statistics.top_day.count} messages on {formatDate(statistics.top_day.date)}</span>
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
                                    return 'fill-rose-900';
                                } else if (percentage > 0.8) {
                                    return 'fill-rose-800';
                                } else if (percentage > 0.7) {
                                    return 'fill-rose-700';
                                } else if (percentage > 0.6) {
                                    return 'fill-rose-600';
                                } else if (percentage > 0.5) {
                                    return 'fill-rose-500';
                                } else if (percentage > 0.4) {
                                    return 'fill-rose-400';
                                } else if (percentage > 0.3) {
                                    return 'fill-rose-300';
                                } else if (percentage > 0.2) {
                                    return 'fill-rose-200';
                                } else if (percentage > 0.1) {
                                    return 'fill-rose-100';
                                } else {
                                    return 'fill-rose-50';
                                }
                            }}
                            titleForValue={(value) => {
                                if (!value) {
                                    return '0 messages';
                                }
                                return `${value.count} messages on ${formatDate(value.date)}`;
                            }}
                        />
                    </div>
                </div>
                <button onClick={() => onExit()} className="fixed bottom-4 right-4 uppercase shadow bg-rose-500 hover:bg-rose-400 focus:shadow-outline focus:outline-none text-white text-base py-3 px-6 rounded">
                    Back
                </button>
            </div>
        );
    }
  }
  
  export default Display;
  