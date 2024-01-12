import React, { useState, useEffect } from 'react'
import './Effect.css'

const UserList = () => {
	const [userList, setUserList] = useState([])
	const [selectedUser, setSelectedUser] = useState()
	const [userData, setUserData] = useState()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json'
				)
				const data = await response.json()
				setUserList(data)
			} catch (error) {
				console.error('Ошибка при получении списка пользователей:', error)
			}
		}
		fetchData()
	}, [])

	const handleUserClick = userId => {
		setSelectedUser(userId)	
		console.log(selectedUser)
	}

	useEffect(() => {
		fetch(
			`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${selectedUser}.json`
		)
			.then(response => response.json())
			.then(json => setUserData(json))
	}, [selectedUser])	

	return (
		<div className='center'>
			<div>
				{userList.map(item => (
					<div key={item.id} onClick={() => handleUserClick(item.id)}>
						<h3>{item.name}</h3>
					</div>
				))}
			</div>
			{userData && (
				<div>
					<img src={userData.avatar + '?q=' + Date.now()} alt='avatar' />
					<p>имя: {userData.name}</p>
					<p>город: {userData.details.city}</p>
					<p>компания: {userData.details.company}</p>
					<p>позиция: {userData.details.position}</p>
				</div>
			)}
		</div>
	)
}

export default UserList
