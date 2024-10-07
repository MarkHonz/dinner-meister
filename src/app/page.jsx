import styles from './page.module.scss';
import { getUsers } from '@/lib/user-db';
import DeleteButton from '@/components/delete-button';

export default async function Home() {
	const users = await getUsers();

	return (
		<main className={styles.main}>
			<h1>Dinner Meister</h1>
			{users.map((user) => {
				return (
					<div key={user.id}>
						<h3
							key={user.id}
						>{`Name: ${user.profile.name} Email: ${user.email}`}</h3>
						<DeleteButton id={user.id} />
					</div>
				);
			})}
		</main>
	);
}
