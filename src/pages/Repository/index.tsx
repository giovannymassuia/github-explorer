/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import api from '../../services/api';

import {
  Header,
  RepositoryInfo,
  RepositoryInfoSkeleton,
  Issues,
  IssuesSkeleton,
} from './styles';
import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    // api.get(`/repos/${params.repository}`).then((response) => {
    //   console.log(response.data);
    // });

    // api.get(`/repos/${params.repository}/issues`).then((response) => {
    //   console.log(response.data);
    // });

    (async () => {
      // console.log('Waiting...');

      // const sleep = (m: number): Promise<void> =>
      //   new Promise((r) => setTimeout(r, m));

      // await sleep(5000);
      // await (() => new Promise((r) => setTimeout(r, 2000)))();

      // console.log('Done!');

      const [
        { data: repositoryResponse },
        { data: issuesResponse },
      ] = await Promise.all([
        api.get(`/repos/${params.repository}`),
        api.get(`/repos/${params.repository}/issues`),
      ]);

      setRepository(repositoryResponse);
      setIssues(issuesResponse);
    })();
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository ? (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      ) : (
        <RepositoryInfoSkeleton>
          <SkeletonTheme color="#fff" highlightColor="#f0f0f5">
            <header>
              <Skeleton circle height={120} width={120} />
              <div>
                <Skeleton width={300} height={42} />
                <Skeleton width={480} height={30} />
              </div>
            </header>

            <ul>
              <li>
                <Skeleton width={60} height={42} />
                <Skeleton width={60} />
              </li>
              <li>
                <Skeleton width={60} height={42} />
                <Skeleton width={60} />
              </li>
              <li>
                <Skeleton width={60} height={42} />
                <Skeleton width={60} />
              </li>
            </ul>
          </SkeletonTheme>
        </RepositoryInfoSkeleton>
      )}

      <Issues>
        {repository
          ? issues.map((issue) => (
              <a key={issue.id} href={issue.html_url}>
                <div>
                  <strong>{issue.title}</strong>
                  <p>{issue.user.login}</p>
                </div>

                <FiChevronRight size={20} />
              </a>
            ))
          : [...Array(3)].map((x, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <IssuesSkeleton key={i}>
                <SkeletonTheme color="#fff" highlightColor="#f0f0f5">
                  <Skeleton width={160} height={25} />
                  <Skeleton width={480} />
                </SkeletonTheme>
              </IssuesSkeleton>
            ))}
      </Issues>
    </>
  );
};

export default Repository;
