import { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCopy } from 'react-icons/fi';
import { useTransition, animated, Spring } from 'react-spring';

import styles from './styles.module.scss';

type ButtonCopyProps = {
  description: string;
  value: string;
}

type CopyMessage = {
  message: string;
}

export function ButtonCopy({ description, value }: ButtonCopyProps) {
  const [isCopy, setIsCopy] = useState<CopyMessage[]>([]);

  const copyTransitions = useTransition(
    isCopy,
    {
      from: { 
        height: '0rem',
        opacity: 0,
        marginTop: '0px',
      },
      enter: { 
        height: '1.5rem',
        opacity: 1,
        marginTop: '-3px',
      },
      leave: { 
        height: '0rem',
        opacity: -1,
        marginTop: '0px',
      },
      delay: 200,
    }
  );

  useEffect(() => {
    if (isCopy.length > 0) {
      const timeOut = setTimeout(() => setIsCopy([]), 1500);

      return () => {
        clearTimeout(timeOut);
        setIsCopy([]);
      }
    }

  }, [isCopy])

  return (
    <div className={styles.container}>
      <CopyToClipboard 
        text={value}
        onCopy={() => {
          setIsCopy([{ message: 'Copiado!' }]);
        }}
      >
        <div className={styles.seletor}>
          <p>{description}:</p>
          <span>{value}</span>
          <button>
            <FiCopy color="#fff" size={18} />
          </button>
        </div>
      </CopyToClipboard>
      {
        copyTransitions((stylesFooter, item) => (
          <animated.footer 
            className={styles.aviso} 
            style={stylesFooter}
          >
            <span>Copiado!</span>
          </animated.footer>
        ))
      }
    </div>
  );
}