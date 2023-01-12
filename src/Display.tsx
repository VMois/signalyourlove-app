function Display({ statistics }) {
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
                <div className="shadow p-4 col-span-2">
                    <p className="text-indigo-500 text-base font-medium uppercase leading-4">We sent each other</p>
                    <p className="text-black font-bold text-2xl inline-flex items-center space-x-2 mt-2">
                    <span>{statistics.total_messages} messages</span>
                    </p>
                </div>
                <div className="shadow p-4 col-span-2">
                    <p className="text-indigo-500 text-base font-medium uppercase leading-4">Our record is</p>
                    <p className="text-black font-bold text-2xl inline-flex items-center space-x-2 my-2">
                    <span>{statistics.top_day.total} messages on {statistics.top_day.date}</span>
                    </p>
                </div>
                </div>
        </div>
        );
    }
  }
  
  export default Display;
  