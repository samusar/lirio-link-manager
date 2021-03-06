import Head from 'next/head';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import Prismic from '@prismicio/client';
import { FiCopy } from 'react-icons/fi';
import { CopyToClipboard } from 'react-copy-to-clipboard';


import logoImage from '../../public/logo.svg';

import styles from './home.module.scss';
import { ButtonCopy } from '../components/ButtonCopy';


type LinkAccess = {
  title: {
    text: string;
  }[];
  link_para_acesso: {
    url: string;
  }
};

type HomePros = {
  infoBank: {
    banco: string;
    agencia: string;
    conta: string;
    cnpj: string;
    tipo_chave_pix: string;
    chave_pix: string;
    links: LinkAccess[],
  }
}

export default function Home({ infoBank }: HomePros) {
  return (
    <div style={{ height: '100%' }}>
      <Head>
        <title>IBLV | Gerênciador de Links</title>
        <meta name="description" content="Gerênciador de Links" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <Image src={logoImage} alt="IBLV" />
        <h1>
          IBLV | <span>Uma Igreja em Célula</span>
        </h1>
        <p>PIX</p>
        <ButtonCopy 
          description={infoBank.tipo_chave_pix}
          value={infoBank.chave_pix}
        />
        <p>DADOS BANCÁRIOS</p>
        <ButtonCopy 
          description="Banco"
          value={infoBank.banco}
        />
        <ButtonCopy 
          description="Ag."
          value={infoBank.agencia}
        />
        <ButtonCopy 
          description="Conta"
          value={infoBank.conta}
        />
        <ButtonCopy 
          description="CNPJ"
          value={infoBank.cnpj}
        />
        <p>ACESSE</p>
        { infoBank.links.map(link => (
          <a 
            key={link.link_para_acesso.url} 
            href={link.link_para_acesso.url}
            target="_blank" rel="noreferrer"
            >
              {String(link.title[0].text).toUpperCase()}
            </a>
        )) }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.linkedin.com/in/samuel-moncao"
          target="_blank"
          rel="noopener noreferrer"
        >
          Feito por Samuel Monção
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiEndpoint = 'https://manager-link.cdn.prismic.io/api/v2';

  const Client = Prismic.client(apiEndpoint);

  const responsePrismc = await Client.query(
    Prismic.Predicates.at('document.type', 'links_uteis')
  )

  if (responsePrismc && responsePrismc.results[0]) {
    const { data } = responsePrismc.results[0];

    return {
      props: {
        infoBank: {
          banco: data.banco[0].text,
          agencia: data.agencia[0].text,
          conta: data.conta[0].text,
          cnpj: data.cnpj[0].text,
          tipo_chave_pix: data.tipo_chave_pix[0].text,
          chave_pix: data.chave_pix[0].text,
          links: data.body[0].items,
        }
      },
    }
  }

  return {
    props: {
      infoBank: {
        banco: "",
        agencia: "",
        conta: "",
        cnpj: "",
        tipo_chave_pix: "",
        chave_pix: "",
        links: [],
      }
    },
  }
}