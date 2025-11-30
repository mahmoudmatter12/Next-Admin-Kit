'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const letters = [
  'k',
  'v',
  'n',
  'z',
  'i',
  'x',
  'm',
  'e',
  't',
  'a',
  'x',
  'l',
  { letter: '4', className: 'one' },
  { letter: '0', className: 'two' },
  { letter: '4', className: 'three' },
  'y',
  'y',
  'w',
  'v',
  'b',
  'o',
  'q',
  'd',
  'y',
  'p',
  'a',
  { letter: 'p', className: 'four' },
  { letter: 'a', className: 'five' },
  { letter: 'g', className: 'six' },
  { letter: 'e', className: 'seven' },
  'v',
  'j',
  'a',
  { letter: 'n', className: 'eight' },
  { letter: 'o', className: 'nine' },
  { letter: 't', className: 'ten' },
  's',
  'c',
  'e',
  'w',
  'v',
  'x',
  'e',
  'p',
  'c',
  'f',
  'h',
  'q',
  'e',
  { letter: 'f', className: 'eleven' },
  { letter: 'o', className: 'twelve' },
  { letter: 'u', className: 'thirteen' },
  { letter: 'n', className: 'fourteen' },
  { letter: 'd', className: 'fifteen' },
  's',
  'w',
  'q',
  'v',
  'o',
  's',
  'm',
  'v',
  'f',
  'u',
];

const animationSequence = [
  { className: 'one', delay: 1500 },
  { className: 'two', delay: 2000 },
  { className: 'three', delay: 2500 },
  { className: 'four', delay: 3000 },
  { className: 'five', delay: 3500 },
  { className: 'six', delay: 4000 },
  { className: 'seven', delay: 4500 },
  { className: 'eight', delay: 5000 },
  { className: 'nine', delay: 5500 },
  { className: 'ten', delay: 6000 },
  { className: 'eleven', delay: 6500 },
  { className: 'twelve', delay: 7000 },
  { className: 'thirteen', delay: 7500 },
  { className: 'fourteen', delay: 8000 },
  { className: 'fifteen', delay: 8500 },
];

export default function NotFound() {
  const [selectedLetters, setSelectedLetters] = useState<Set<string>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Set up letter animations
    const timeouts: NodeJS.Timeout[] = [];

    animationSequence.forEach(({ className, delay }) => {
      const timeout = setTimeout(() => {
        setSelectedLetters(prev => new Set(prev).add(className));
      }, delay);
      timeouts.push(timeout);
    });

    // Handle resize for square letters
    const handleResize = () => {
      const wordsearch = document.getElementById('wordsearch');
      if (wordsearch) {
        const width = wordsearch.offsetWidth;
        const letterWidth = width / 12 - 2; // 12 letters per row, accounting for margins
        const letters = document.querySelectorAll('#wordsearch li');
        letters.forEach(letter => {
          (letter as HTMLElement).style.height = `${letterWidth}px`;
          (letter as HTMLElement).style.lineHeight = `${letterWidth}px`;
        });
        (wordsearch as HTMLElement).style.height = `${width}px`;
      }
    };

    // Initial setup
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Add search functionality here if needed
    console.log('Search:', searchQuery);
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center p-4'
      style={{
        background:
          'radial-gradient(ellipse at center, var(--setup-primary) 0%, var(--setup-secondary) 100%)',
      }}
    >
      <div id='wrap' className='w-[80%] max-w-[1400px] relative mt-[8%]'>
        {/* Word Search Grid */}
        <div id='wordsearch' className='w-[45%] float-left'>
          <ul className='m-0 p-0 list-none'>
            {letters.map((item, index) => {
              const letter = typeof item === 'string' ? item : item.letter;
              const className = typeof item === 'string' ? '' : item.className;
              const isSelected = selectedLetters.has(className);

              return (
                <li
                  key={index}
                  className={`float-left w-[12%] mr-[0.5%] mb-[0.5%] p-0 block text-center uppercase overflow-hidden text-[1.6vw] font-light transition-all duration-75 ${
                    isSelected ? 'font-normal' : ''
                  } ${className}`}
                  style={{
                    backgroundColor: isSelected
                      ? 'var(--setup-secondary)'
                      : 'rgba(0,0,0,0.2)',
                    color: isSelected
                      ? 'var(--setup-text)'
                      : 'rgba(255,255,255,0.7)',
                    height: 'auto',
                    lineHeight: '1',
                    aspectRatio: '1',
                  }}
                >
                  {letter}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Main Content */}
        <div
          id='main-content'
          className='float-right max-w-[45%] font-light text-lg pb-10 leading-7'
          style={{ color: 'var(--setup-text)' }}
        >
          <h1 className='m-0 font-normal text-[42px] mb-10 leading-normal'>
            We couldn&apos;t find what you were looking for.
          </h1>
          <p className='mb-4'>
            Unfortunately the page you were looking for could not be found. It
            may be temporarily unavailable, moved or no longer exist.
          </p>
          <p className='mb-4'>
            Check the URL you entered for any mistakes and try again.
            Alternatively, search for whatever is missing or take a look around
            the rest of our site.
          </p>

          {/* Search Form */}
          <div id='search' className='mt-8'>
            <form onSubmit={handleSearch}>
              <div className='flex gap-2'>
                <input
                  type='text'
                  placeholder='Search'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='flex-1 h-[41px] pl-4 pr-4 box-border border-none outline-none text-base font-light transition-all duration-500 rounded-none'
                  style={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    color: 'var(--setup-text)',
                  }}
                />
                <button
                  type='submit'
                  className='w-[10%] h-[41px] outline-none border-none font-light text-base cursor-pointer transition-all duration-500 text-center'
                  style={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    color: 'var(--setup-text)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor =
                      'var(--setup-secondary)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)';
                  }}
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Navigation */}
          <div id='navigation' className='mt-8'>
            <Link
              href='/'
              className='inline-block float-left px-4 h-[41px] leading-[41px] no-underline text-base transition-all duration-500 mr-[2%] mb-[2%]'
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                color: 'var(--setup-text)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor =
                  'var(--setup-secondary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)';
              }}
            >
              Home
            </Link>
            <Link
              href='/admin'
              className='inline-block float-left px-4 h-[41px] leading-[41px] no-underline text-base transition-all duration-500 mr-[2%] mb-[2%]'
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                color: 'var(--setup-text)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor =
                  'var(--setup-secondary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)';
              }}
            >
              Dashboard
            </Link>
            <Link
              href='/admin/users'
              className='inline-block float-left px-4 h-[41px] leading-[41px] no-underline text-base transition-all duration-500 mr-[2%] mb-[2%]'
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                color: 'var(--setup-text)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor =
                  'var(--setup-secondary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)';
              }}
            >
              Users
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

        body {
          font-family: 'Source Sans Pro', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        ::selection {
          background-color: rgba(0, 0, 0, 0.2);
        }

        ::-moz-selection {
          background-color: rgba(0, 0, 0, 0.2);
        }

        #search input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        @media all and (max-width: 899px) {
          #wrap {
            width: 90%;
          }
        }

        @media all and (max-width: 799px) {
          #wrap {
            width: 90%;
            height: auto;
            margin-top: 40px;
            top: 0%;
          }
          #wordsearch {
            width: 90%;
            float: none;
            margin: 0 auto;
          }
          #wordsearch ul li {
            font-size: 4vw;
          }
          #main-content {
            float: none;
            width: 90%;
            max-width: 90%;
            margin: 0 auto;
            margin-top: 30px;
            text-align: justify;
          }
          #main-content h1 {
            text-align: left;
          }
          #search input[type='text'] {
            width: 84%;
          }
          #search button {
            width: 15%;
          }
        }

        @media all and (max-width: 499px) {
          #main-content h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}
