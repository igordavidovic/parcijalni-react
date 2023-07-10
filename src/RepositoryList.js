import React from 'react';
import './App.css';

export default function RepositoryList(props) {
    return (
        <ul className='Repository-List'>
            {props.repositories.length > 0 && props.repositories.map((repo) => {
                return <li className="Repository-List-Item" key={repo.id}>
                    <span>{repo.name}</span>
                </li>
            })}
        </ul>
    )
}
