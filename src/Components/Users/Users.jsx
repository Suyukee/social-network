import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';

const Users = (props) => {
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
	pagesCount = 12; // Удалить ограничитель
	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	return (
		<div className={styles.content}>
			<div className={styles.pagesList}>
				{pages.map((p) => {
					return (
						<span
							className={props.currentPage === p && styles.selectedPage}
							onClick={(e) => {
								props.onPageChanged(p);
							}}
						>
							{p}
						</span>
					);
				})}
			</div>
			{props.users.map((u) => (
				<div key={u.id} className={styles.item}>
					<div className={styles.left}>
						<NavLink to={`/profile/${u.id}`}>
							<img
								src={u.photos.small != null ? u.photos.small : userPhoto}
								className={styles.userPhoto}
								alt=""
							/>
						</NavLink>
						<div className={styles.button}>
							{u.followed ? (
								<button
									className={styles.unfollow}
									disabled={props.followingInProgress.some((id) => id === u.id)}
									onClick={() => {
										props.unfollow(u.id);
									}}
								>
									Unfollow
								</button>
							) : (
								<button
									disabled={props.followingInProgress.some((id) => id === u.id)}
									onClick={() => {
										props.follow(u.id);
									}}
								>
									Follow
								</button>
							)}
						</div>
					</div>
					<div className={styles.right}>
						<div className={styles.user_info}>
							<p className={styles.fullname}>{u.name}</p>
							<p>{u.status}</p>
						</div>
						<div className={styles.location}>
							<p>{`u.location.country`}</p>
							<p>{`u.location.city`}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Users;
