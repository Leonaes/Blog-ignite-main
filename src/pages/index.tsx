import { GetStaticProps } from 'next';
import Link from 'next/link';

import { getPrismicClient } from '../services/prismic';
import Prismic from "@prismicio/client";

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import {RichText} from 'prismic-dom';

interface Post {
  slug: string;
  first_publication_date: string;
  title: string;
  excerpt: string;
  author: string;
  };



interface PostProps {
  next_page: string;
  posts: Post[];
}

//interface HomeProps {
 // postsPagination: PostPagination;
//}

 export default function Home({posts}: PostProps) {
   return (
      <div className={styles.background}>
        <div className={styles.container}>
            <img src="/Logo.svg" alt="logo" />
            <div className={styles.content}>
              {posts.map(post => (
                <div className={styles.content}>
                  <Link href={`/post/${post.slug} `}>
                    <a key={post.slug} >{post.title}</a>
                  </Link>
                  <p>{post.excerpt}</p>
                <div className={styles.contentSpecs}>
                  <div className={styles.specs}>
                    <img src="/calendar.svg" alt="Data" />
                    <time>{post.first_publication_date}</time>
                  </div>
                  <div className={styles.specs}>
                    <img src="user.svg" alt="user" />
                    <p>{post.author}</p>
                  </div>
                </div>
              </div>
              ))}
            </div>
        </div>
      </div>
   )
 }
 

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
    const postsResponse = await prismic.query([
      Prismic.Predicates.at('document.type', 'publication')
    ], {
      fetch: ['publication.title', 'publication.content'],
      pageSize: 5,
    });

    const posts = postsResponse.results.map(post => {
      return {
        slug: post.uid,
        title: post.data.title,
        author: post.data.author?? "Autor nao informado",
        excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? 'Sem Descrição',
        first_publication_date: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      };
    });

  return {
    props: {
      posts
    }
  }
 };
