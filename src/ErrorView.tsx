/*
  Author(s): Vladyslav Moisieienkov
  License: GNU General Public License version 3 (GPL-3.0)
*/

export default function ErrorView({ message }: { message: string }) {
    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <h3 className="text-rose-500 text-center text-4xl font-bold">Opps... Something is not working</h3>
                <p className="mt-4 text-gray-700">{message}</p>
            </div>
        </div>
    );
}
