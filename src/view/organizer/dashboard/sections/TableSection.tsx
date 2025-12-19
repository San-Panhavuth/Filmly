'use client';

export default function TableSection({ analytics }: { analytics: unknown }) {
	const getValue = (key: string, defaultValue: unknown = []) => {
		if (analytics && typeof analytics === 'object' && analytics !== null && key in analytics) {
			return (analytics as Record<string, unknown>)[key] ?? defaultValue;
		}
		return defaultValue;
	};
	const topEvents = getValue('topEvents') as unknown[];
	const totalSubmissions = getValue('totalSubmissions', 0) as number;
	const acceptanceRate = getValue('acceptanceRate', 0) as number;

	return (
		<section className="mb-6 bg-white rounded-xl shadow p-6">
			<h2 className="text-green-900 font-semibold text-lg mb-4">
				Festival Performance Summary
			</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full text-left border-separate border-spacing-y-2">
					<thead>
						<tr className="text-gray-500 text-sm">
							<th className="px-4 py-2 font-semibold">Festival</th>
							<th className="px-4 py-2 font-semibold">Total Submissions</th>
							<th className="px-4 py-2 font-semibold">Deadline</th>
						</tr>
					</thead>
					<tbody>
						{topEvents.length > 0 ? (
							topEvents.map((event) => {
								if (event && typeof event === 'object' && event !== null) {
									const e = event as { id?: string | number; title?: string; submissionCount?: number; deadline?: string };
									return (
										<tr
											key={e.id}
											className="bg-white border-b last:border-b-0"
										>
											<td className="px-4 py-2 text-gray-900 whitespace-nowrap">
												{e.title}
											</td>
											<td className="px-4 py-2 text-gray-900">
												{e.submissionCount}
											</td>
											<td className="px-4 py-2 text-gray-900">
												{e.deadline ? new Date(e.deadline).toLocaleDateString() : 'N/A'}
											</td>
										</tr>
									);
								}
								return null;
							})
						) : (
							<tr>
								<td colSpan={3} className="px-4 py-8 text-center text-gray-500">
									No events yet. Create your first festival to see analytics!
								</td>
							</tr>
						)}
						{topEvents.length > 0 && (
							<tr className="bg-gray-50 border-t font-semibold">
								<td className="px-4 py-2 text-green-900">Total</td>
								<td className="px-4 py-2 text-green-900">{totalSubmissions}</td>
								<td className="px-4 py-2 text-green-900">
									{acceptanceRate}% accepted
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}
