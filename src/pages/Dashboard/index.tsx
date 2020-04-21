import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight, FiTrash2, FiSearch } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import {
  Title,
  Form,
  Repositories,
  RepositorySkeleton,
  LinkContainer,
  Error,
} from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplores:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setLoadingPage(false);
    }, 1000);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplores:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  function handleDeleteRepository(repository: Repository): void {
    const repositoryIndex = repositories.findIndex(
      (repo) => repo.full_name === repository.full_name,
    );

    repositories.splice(repositoryIndex, 1);

    setRepositories([...repositories]);
  }

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setInputError('');

    if (!newRepo) {
      setInputError('Enter the author/name of a respository');
      return;
    }

    const repositoryExists = repositories.find(
      (repo) => repo.full_name.toLowerCase() === newRepo.toLowerCase(),
    );

    if (repositoryExists) {
      setInputError('Repository already added.');
      return;
    }

    try {
      setLoading(true);

      await (() => new Promise((r) => setTimeout(r, 1000)))();

      const response = await api.get<Repository>(`/repos/${newRepo}`);

      const repository = response.data;

      setRepositories([repository, ...repositories]);
      setNewRepo('');
    } catch (error) {
      setInputError('Repository not found.');
    }

    setLoading(false);
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositories on Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          ref={(input) => input && input.focus()}
          disabled={loading}
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Enter the author/name of a respository"
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <FaSpinner size={20} />
          ) : (
            <>
              <FiSearch size={20} />
              <span>Search</span>
            </>
          )}
        </button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {loading && (
          <SkeletonTheme color="#fff" highlightColor="#f0f0f5">
            <RepositorySkeleton>
              <Skeleton circle height={64} width={64} />
              <div>
                <Skeleton width="30%" height={25} />
                <Skeleton width="70%" />
              </div>
            </RepositorySkeleton>
          </SkeletonTheme>
        )}

        {loadingPage &&
          [...Array(2)].map((x, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <SkeletonTheme key={i} color="#fff" highlightColor="#f0f0f5">
              <RepositorySkeleton>
                <Skeleton circle height={64} width={64} />
                <div>
                  <Skeleton width="30%" height={25} />
                  <Skeleton width="70%" />
                </div>
              </RepositorySkeleton>
            </SkeletonTheme>
          ))}

        {!loadingPage &&
          (repositories.length === 0 && !loading ? (
            <strong>No respositories added yet.</strong>
          ) : (
            repositories.map((repository) => (
              <LinkContainer key={repository.full_name}>
                <Link to={`/respositories/${repository.full_name}`}>
                  <img
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login}
                  />
                  <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                  </div>

                  <FiChevronRight size={20} />
                </Link>
                <FiTrash2
                  color="#e23337"
                  size={26}
                  onClick={() => handleDeleteRepository(repository)}
                  className="btn-delete"
                />
              </LinkContainer>
            ))
          ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
