modules["editor/toolbar"] = {
  html: `
  <button class="eTool" tool="select" selected><div><svg width="26" viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="path-1-outside-1_306_4" maskUnits="userSpaceOnUse" x="0.192818" y="4.08914" width="36" height="44" fill="black"> <rect fill="white" x="0.192818" y="4.08914" width="36" height="44"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7602 8.2371C8.79786 5.37292 3.25704 8.19611 3.24522 13.0852L3.19284 34.7545C3.18199 39.2411 7.9192 42.1519 11.9168 40.1151L15.9383 38.066L18.0344 42.1798C19.288 44.6402 22.2989 45.6185 24.7593 44.3649L26.0925 43.6856C28.5529 42.4319 29.5312 39.4211 28.2776 36.9606L26.1815 32.8468L29.5308 31.1403C33.5284 29.1034 33.9579 23.56 30.3218 20.9316L12.7602 8.2371Z"/> </mask> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7602 8.2371C8.79786 5.37292 3.25704 8.19611 3.24522 13.0852L3.19284 34.7545C3.18199 39.2411 7.9192 42.1519 11.9168 40.1151L15.9383 38.066L18.0344 42.1798C19.288 44.6402 22.2989 45.6185 24.7593 44.3649L26.0925 43.6856C28.5529 42.4319 29.5312 39.4211 28.2776 36.9606L26.1815 32.8468L29.5308 31.1403C33.5284 29.1034 33.9579 23.56 30.3218 20.9316L12.7602 8.2371Z" fill="#2F2F2F"/> <path d="M3.24522 13.0852L0.74523 13.0792L3.24522 13.0852ZM12.7602 8.2371L14.2247 6.21101L14.2247 6.21101L12.7602 8.2371ZM3.19284 34.7545L5.69283 34.7606L3.19284 34.7545ZM11.9168 40.1151L10.7818 37.8876L10.7818 37.8876L11.9168 40.1151ZM15.9383 38.066L18.1658 36.931L17.0308 34.7035L14.8033 35.8385L15.9383 38.066ZM18.0344 42.1798L15.8068 43.3147L15.8068 43.3147L18.0344 42.1798ZM24.7593 44.3649L23.6244 42.1373L23.6244 42.1373L24.7593 44.3649ZM26.0925 43.6856L27.2274 45.9131L27.2274 45.9131L26.0925 43.6856ZM28.2776 36.9606L30.5051 35.8256L30.5051 35.8256L28.2776 36.9606ZM26.1815 32.8468L25.0465 30.6193L22.819 31.7543L23.954 33.9818L26.1815 32.8468ZM29.5308 31.1403L30.6658 33.3678L29.5308 31.1403ZM30.3218 20.9316L31.7864 18.9055L31.7864 18.9055L30.3218 20.9316ZM5.74522 13.0913C5.75211 10.2393 8.98425 8.59242 11.2956 10.2632L14.2247 6.21101C8.61146 2.15342 0.761974 6.15294 0.74523 13.0792L5.74522 13.0913ZM5.69283 34.7606L5.74522 13.0913L0.74523 13.0792L0.692844 34.7485L5.69283 34.7606ZM10.7818 37.8876C8.44987 39.0757 5.6865 37.3777 5.69283 34.7606L0.692844 34.7485C0.677478 41.1044 7.38852 45.2281 13.0517 42.3426L10.7818 37.8876ZM14.8033 35.8385L10.7818 37.8876L13.0517 42.3426L17.0733 40.2935L14.8033 35.8385ZM20.2619 41.0448L18.1658 36.931L13.7108 39.201L15.8068 43.3147L20.2619 41.0448ZM23.6244 42.1373C22.3941 42.7642 20.8887 42.275 20.2619 41.0448L15.8068 43.3147C17.6873 47.0054 22.2036 48.4729 25.8943 46.5924L23.6244 42.1373ZM24.9575 41.4581L23.6244 42.1373L25.8943 46.5924L27.2274 45.9131L24.9575 41.4581ZM26.05 38.0956C26.6769 39.3258 26.1877 40.8312 24.9575 41.4581L27.2274 45.9131C30.9181 44.0326 32.3856 39.5163 30.5051 35.8256L26.05 38.0956ZM23.954 33.9818L26.05 38.0956L30.5051 35.8256L28.409 31.7119L23.954 33.9818ZM28.3958 28.9128L25.0465 30.6193L27.3165 35.0744L30.6658 33.3678L28.3958 28.9128ZM28.8572 22.9577C30.9783 24.4909 30.7277 27.7246 28.3958 28.9128L30.6658 33.3678C36.329 30.4822 36.9375 22.629 31.7864 18.9055L28.8572 22.9577ZM11.2956 10.2632L28.8572 22.9577L31.7864 18.9055L14.2247 6.21101L11.2956 10.2632Z" fill="white" mask="url(#path-1-outside-1_306_4)"/> </svg></div></button>
  <button class="eTool" tool="markup"><div><svg width="26" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22.1358 20.1389L23.3104 19.7113L23.7379 20.8859L27.5001 31.2226C28.4918 33.9472 27.087 36.9599 24.3624 37.9516L18.7242 40.0037C15.9996 40.9954 12.9869 39.5905 11.9952 36.8659L8.23298 26.5293L7.80546 25.3547L8.98008 24.9271L22.1358 20.1389Z" fill="#FFED46" stroke="white" stroke-width="2.5"/> <path d="M11.9685 33.1377L10.7938 33.5652L10.3663 32.3906L2.49986 10.7776C1.50817 8.053 2.913 5.04033 5.63764 4.04864L11.2758 1.99652C14.0004 1.00484 17.0131 2.40967 18.0048 5.1343L25.8712 26.7472L26.2988 27.9219L25.1242 28.3494L11.9685 33.1377Z" fill="#2F2F2F" stroke="white" stroke-width="2.5"/> </svg></div></button>
  <button class="eTool" tool="text"><div><svg width="44" viewBox="0 0 52 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3 7V3H25.5V7H17V29.5H12V7H3Z" fill="#2F2F2F"/> <path d="M34 19L26.5 9H31.5L36.5 15.5L42 9H47L39.5 19L47 29.5H42L36.5 22.5L31.5 29.5H26L34 19Z" fill="#0084FF"/> <mask id="path-3-outside-1_925_51" maskUnits="userSpaceOnUse" x="0" y="0" width="52" height="32" fill="black"> <rect fill="white" width="52" height="32"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3V7H12V29.5H17V7H25.5V3H3ZM26.5 9L34 19L26 29.5H31.5L36.5 22.5L42 29.5H47L39.5 19L47 9H42L36.5 15.5L31.5 9H26.5Z"/> </mask> <path d="M3 7H0.5V9.5H3V7ZM3 3V0.5H0.5V3H3ZM12 7H14.5V4.5H12V7ZM12 29.5H9.5V32H12V29.5ZM17 29.5V32H19.5V29.5H17ZM17 7V4.5H14.5V7H17ZM25.5 7V9.5H28V7H25.5ZM25.5 3H28V0.5H25.5V3ZM34 19L35.9886 20.5151L37.1339 19.0119L36 17.5L34 19ZM26.5 9V6.5H21.5L24.5 10.5L26.5 9ZM26 29.5L24.0114 27.9849L20.9523 32H26V29.5ZM31.5 29.5V32H32.7865L33.5343 30.9531L31.5 29.5ZM36.5 22.5L38.4658 20.9554L36.4047 18.3322L34.4657 21.0469L36.5 22.5ZM42 29.5L40.0342 31.0446L40.7849 32H42V29.5ZM47 29.5V32H51.858L49.0343 28.0469L47 29.5ZM39.5 19L37.5 17.5L36.402 18.964L37.4657 20.4531L39.5 19ZM47 9L49 10.5L52 6.5H47V9ZM42 9V6.5H40.8405L40.0915 7.38514L42 9ZM36.5 15.5L34.5184 17.0243L36.4073 19.4798L38.4085 17.1149L36.5 15.5ZM31.5 9L33.4816 7.47572L32.731 6.5H31.5V9ZM5.5 7V3H0.5V7H5.5ZM12 4.5H3V9.5H12V4.5ZM14.5 29.5V7H9.5V29.5H14.5ZM17 27H12V32H17V27ZM14.5 7V29.5H19.5V7H14.5ZM25.5 4.5H17V9.5H25.5V4.5ZM23 3V7H28V3H23ZM3 5.5H25.5V0.5H3V5.5ZM36 17.5L28.5 7.5L24.5 10.5L32 20.5L36 17.5ZM27.9886 31.0151L35.9886 20.5151L32.0114 17.4849L24.0114 27.9849L27.9886 31.0151ZM31.5 27H26V32H31.5V27ZM34.4657 21.0469L29.4657 28.0469L33.5343 30.9531L38.5343 23.9531L34.4657 21.0469ZM43.9658 27.9554L38.4658 20.9554L34.5342 24.0446L40.0342 31.0446L43.9658 27.9554ZM47 27H42V32H47V27ZM37.4657 20.4531L44.9657 30.9531L49.0343 28.0469L41.5343 17.5469L37.4657 20.4531ZM45 7.5L37.5 17.5L41.5 20.5L49 10.5L45 7.5ZM42 11.5H47V6.5H42V11.5ZM38.4085 17.1149L43.9085 10.6149L40.0915 7.38514L34.5915 13.8851L38.4085 17.1149ZM29.5184 10.5243L34.5184 17.0243L38.4816 13.9757L33.4816 7.47572L29.5184 10.5243ZM26.5 11.5H31.5V6.5H26.5V11.5Z" fill="white" mask="url(#path-3-outside-1_925_51)"/> </svg></div></button>
  <button class="eTool" tool="draw"><div><svg width="22" viewBox="0 0 27 44" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M18.5551 17.1002L19.7297 16.6726L20.1572 17.8472L24.7549 30.4794C25.7254 33.1458 25.4184 36.1102 23.922 38.5211L22.5982 40.654C21.9291 41.732 20.6094 42.2123 19.404 41.8166L17.0188 41.0337C14.3228 40.1486 12.1822 38.0752 11.2117 35.4088L6.61393 22.7766L6.18641 21.602L7.36103 21.1745L18.5551 17.1002Z" fill="#DF84FF" stroke="white" stroke-width="2.5"/> <path d="M11.4928 32.5264L10.3182 32.9539L9.89068 31.7793L2.35127 11.065C0.990064 7.32509 2.91836 3.18985 6.65823 1.82865C10.3981 0.467446 14.5333 2.39574 15.8945 6.13561L23.434 26.85L23.8615 28.0246L22.6869 28.4521L11.4928 32.5264Z" fill="#2F2F2F" stroke="white" stroke-width="2.5"/> </svg></div></button>
  <button class="eTool" tool="shape"><div><svg width="38" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="1.97104" y="1.47107" width="22.6493" height="22.6493" rx="5.25" fill="#2F2F2F" stroke="white" stroke-width="2.5"/> <circle cx="32.7043" cy="33.2043" r="11.3246" fill="#FF4C6C" stroke="white" stroke-width="2.5"/> </svg></div></button>
  <button class="eTool" tool="comment"><div><svg width="40" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="path-1-outside-1_233_9" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="32" fill="black"> <rect fill="white" width="48" height="32"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C4.34315 3 3 4.34315 3 6V23C3 26.3137 5.68629 29 9 29H39C42.3137 29 45 26.3137 45 23V9C45 5.68629 42.3137 3 39 3H6ZM13 6C12.4477 6 12 6.44772 12 7V8C12 8.55228 12.4477 9 13 9H41C41.5523 9 42 8.55228 42 8V7C42 6.44772 41.5523 6 41 6H13ZM7 11C6.44772 11 6 11.4477 6 12V13C6 13.5523 6.44772 14 7 14H41C41.5523 14 42 13.5523 42 13V12C42 11.4477 41.5523 11 41 11H7ZM6 17C6 16.4477 6.44772 16 7 16H41C41.5523 16 42 16.4477 42 17V18C42 18.5523 41.5523 19 41 19H7C6.44772 19 6 18.5523 6 18V17Z"/> </mask> <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C4.34315 3 3 4.34315 3 6V23C3 26.3137 5.68629 29 9 29H39C42.3137 29 45 26.3137 45 23V9C45 5.68629 42.3137 3 39 3H6ZM13 6C12.4477 6 12 6.44772 12 7V8C12 8.55228 12.4477 9 13 9H41C41.5523 9 42 8.55228 42 8V7C42 6.44772 41.5523 6 41 6H13ZM7 11C6.44772 11 6 11.4477 6 12V13C6 13.5523 6.44772 14 7 14H41C41.5523 14 42 13.5523 42 13V12C42 11.4477 41.5523 11 41 11H7ZM6 17C6 16.4477 6.44772 16 7 16H41C41.5523 16 42 16.4477 42 17V18C42 18.5523 41.5523 19 41 19H7C6.44772 19 6 18.5523 6 18V17Z" fill="#2F2F2F"/> <path d="M5.5 6C5.5 5.72386 5.72386 5.5 6 5.5V0.5C2.96243 0.5 0.5 2.96244 0.5 6H5.5ZM5.5 23V6H0.5V23H5.5ZM9 26.5C7.067 26.5 5.5 24.933 5.5 23H0.5C0.5 27.6944 4.30558 31.5 9 31.5V26.5ZM39 26.5H9V31.5H39V26.5ZM42.5 23C42.5 24.933 40.933 26.5 39 26.5V31.5C43.6944 31.5 47.5 27.6944 47.5 23H42.5ZM42.5 9V23H47.5V9H42.5ZM39 5.5C40.933 5.5 42.5 7.067 42.5 9H47.5C47.5 4.30558 43.6944 0.5 39 0.5V5.5ZM6 5.5H39V0.5H6V5.5ZM14.5 7C14.5 7.82843 13.8284 8.5 13 8.5V3.5C11.067 3.5 9.5 5.067 9.5 7H14.5ZM14.5 8V7H9.5V8H14.5ZM13 6.5C13.8284 6.5 14.5 7.17157 14.5 8H9.5C9.5 9.933 11.067 11.5 13 11.5V6.5ZM41 6.5H13V11.5H41V6.5ZM39.5 8C39.5 7.17157 40.1716 6.5 41 6.5V11.5C42.933 11.5 44.5 9.933 44.5 8H39.5ZM39.5 7V8H44.5V7H39.5ZM41 8.5C40.1716 8.5 39.5 7.82843 39.5 7H44.5C44.5 5.067 42.933 3.5 41 3.5V8.5ZM13 8.5H41V3.5H13V8.5ZM8.5 12C8.5 12.8284 7.82843 13.5 7 13.5V8.5C5.067 8.5 3.5 10.067 3.5 12H8.5ZM8.5 13V12H3.5V13H8.5ZM7 11.5C7.82843 11.5 8.5 12.1716 8.5 13H3.5C3.5 14.933 5.067 16.5 7 16.5V11.5ZM41 11.5H7V16.5H41V11.5ZM39.5 13C39.5 12.1716 40.1716 11.5 41 11.5V16.5C42.933 16.5 44.5 14.933 44.5 13H39.5ZM39.5 12V13H44.5V12H39.5ZM41 13.5C40.1716 13.5 39.5 12.8284 39.5 12H44.5C44.5 10.067 42.933 8.5 41 8.5V13.5ZM7 13.5H41V8.5H7V13.5ZM7 13.5C5.067 13.5 3.5 15.067 3.5 17H8.5C8.5 17.8284 7.82843 18.5 7 18.5V13.5ZM41 13.5H7V18.5H41V13.5ZM44.5 17C44.5 15.067 42.933 13.5 41 13.5V18.5C40.1716 18.5 39.5 17.8284 39.5 17H44.5ZM44.5 18V17H39.5V18H44.5ZM41 21.5C42.933 21.5 44.5 19.933 44.5 18H39.5C39.5 17.1716 40.1716 16.5 41 16.5V21.5ZM7 21.5H41V16.5H7V21.5ZM3.5 18C3.5 19.933 5.067 21.5 7 21.5V16.5C7.82843 16.5 8.5 17.1716 8.5 18H3.5ZM3.5 17V18H8.5V17H3.5Z" fill="white" mask="url(#path-1-outside-1_233_9)"/> </svg></div></button>
  <button class="eTool" tool="media"><div><svg width="40" viewBox="0 0 50 42" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="path-1-outside-1_233_21" maskUnits="userSpaceOnUse" x="-0.459759" y="-0.0484619" width="51" height="42" fill="black"> <rect fill="white" x="-0.459759" y="-0.0484619" width="51" height="42"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M40.8324 12.3729C43.434 12.3729 45.5431 10.2638 45.5431 7.66221C45.5431 5.06058 43.434 2.95154 40.8324 2.95154C38.2308 2.95154 36.1217 5.06058 36.1217 7.66221C36.1217 10.2638 38.2308 12.3729 40.8324 12.3729ZM15.7765 12.2718C16.9312 10.2718 19.8179 10.2718 20.9726 12.2718L28.5261 25.3549L32.5377 18.4066C33.6924 16.4066 36.5792 16.4066 37.7339 18.4066L47.0534 34.5485C48.2081 36.5485 46.7647 39.0485 44.4553 39.0485H25.8163C25.6154 39.0485 25.4211 39.0296 25.2345 38.9937H5.54471C3.23531 38.9937 1.79194 36.4937 2.94664 34.4937L15.7765 12.2718Z"/> </mask> <path fill-rule="evenodd" clip-rule="evenodd" d="M40.8324 12.3729C43.434 12.3729 45.5431 10.2638 45.5431 7.66221C45.5431 5.06058 43.434 2.95154 40.8324 2.95154C38.2308 2.95154 36.1217 5.06058 36.1217 7.66221C36.1217 10.2638 38.2308 12.3729 40.8324 12.3729ZM15.7765 12.2718C16.9312 10.2718 19.8179 10.2718 20.9726 12.2718L28.5261 25.3549L32.5377 18.4066C33.6924 16.4066 36.5792 16.4066 37.7339 18.4066L47.0534 34.5485C48.2081 36.5485 46.7647 39.0485 44.4553 39.0485H25.8163C25.6154 39.0485 25.4211 39.0296 25.2345 38.9937H5.54471C3.23531 38.9937 1.79194 36.4937 2.94664 34.4937L15.7765 12.2718Z" fill="#2F2F2F"/> <path d="M20.9726 12.2718L23.1377 11.0218V11.0218L20.9726 12.2718ZM15.7765 12.2718L17.9415 13.5218L15.7765 12.2718ZM28.5261 25.3549L26.3611 26.6049L28.5261 30.3549L30.6912 26.6049L28.5261 25.3549ZM32.5377 18.4066L30.3726 17.1566V17.1566L32.5377 18.4066ZM37.7339 18.4066L35.5688 19.6566L35.5688 19.6566L37.7339 18.4066ZM47.0534 34.5485L49.2184 33.2985L47.0534 34.5485ZM25.2345 38.9937L25.7061 36.5386L25.4724 36.4937H25.2345V38.9937ZM2.94664 34.4937L0.781578 33.2437L2.94664 34.4937ZM43.0431 7.66221C43.0431 8.88313 42.0533 9.87289 40.8324 9.87289V14.8729C44.8148 14.8729 48.0431 11.6446 48.0431 7.66221H43.0431ZM40.8324 5.45154C42.0533 5.45154 43.0431 6.44129 43.0431 7.66221H48.0431C48.0431 3.67987 44.8148 0.451538 40.8324 0.451538V5.45154ZM38.6217 7.66221C38.6217 6.44129 39.6115 5.45154 40.8324 5.45154V0.451538C36.8501 0.451538 33.6217 3.67987 33.6217 7.66221H38.6217ZM40.8324 9.87289C39.6115 9.87289 38.6217 8.88313 38.6217 7.66221H33.6217C33.6217 11.6446 36.8501 14.8729 40.8324 14.8729V9.87289ZM23.1377 11.0218C21.0207 7.35513 15.7284 7.35511 13.6114 11.0218L17.9415 13.5218C18.134 13.1885 18.6151 13.1885 18.8076 13.5218L23.1377 11.0218ZM30.6912 24.1049L23.1377 11.0218L18.8076 13.5218L26.3611 26.6049L30.6912 24.1049ZM30.3726 17.1566L26.3611 24.1049L30.6912 26.6049L34.7028 19.6566L30.3726 17.1566ZM39.8989 17.1566C37.782 13.4899 32.4896 13.49 30.3726 17.1566L34.7028 19.6566C34.8952 19.3233 35.3763 19.3233 35.5688 19.6566L39.8989 17.1566ZM49.2184 33.2985L39.8989 17.1566L35.5688 19.6566L44.8883 35.7985L49.2184 33.2985ZM44.4553 41.5485C48.6892 41.5485 51.3354 36.9651 49.2184 33.2985L44.8883 35.7985C45.0807 36.1318 44.8402 36.5485 44.4553 36.5485V41.5485ZM25.8163 41.5485H44.4553V36.5485H25.8163V41.5485ZM24.7628 41.4488C25.1057 41.5147 25.458 41.5485 25.8163 41.5485V36.5485C25.7728 36.5485 25.7365 36.5444 25.7061 36.5386L24.7628 41.4488ZM5.54471 41.4937H25.2345V36.4937H5.54471V41.4937ZM0.781578 33.2437C-1.33537 36.9104 1.3108 41.4937 5.54471 41.4937V36.4937C5.15982 36.4937 4.91925 36.077 5.11171 35.7437L0.781578 33.2437ZM13.6114 11.0218L0.781578 33.2437L5.11171 35.7437L17.9415 13.5218L13.6114 11.0218Z" fill="white" mask="url(#path-1-outside-1_233_21)"/> </svg></div></button>

  <div class="eSubToolHolder">
    <div class="eSubToolShadow"></div>
    <div class="eSubToolContentHolder">
      <div class="eSubToolContentScroll">
        <div class="eSubToolContent"></div>
      </div>
    </div>
  </div>
  `,
  css: {
    ".eTool": `min-width: 50px; height: 50px; flex-shrink: 0; padding: 0; transition: unset`,
    ".eTool div": `display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; transition: .2s`,
    ".eTool:hover div": `background: var(--hover)`,
    ".eTool:active": `transform: unset !important`,
    ".eTool:active div": `transform: scale(.95); background: var(--secondary); border-radius: 15.5px`,
    '.eTool[selected]:active div': `border-radius: 15.5px !important`,
    ".eTool[selected] div": `background: var(--theme); border-top-right-radius: 0px !important; border-bottom-right-radius: 0px !important`,

    ".eDivider": `width: 100%; height: 4px; background: var(--theme)`,

    ".eSubToolHolder": `position: absolute; max-height: 100%; left: 100%; top: 0px; background: var(--pageColor); border-radius: 0 16px 16px 0; border-left: solid 4px var(--theme); transform: scale(0); transform-origin: top left; transition: opacity .3s, transform: .3s`,
    ".eSubToolShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 20px 16px 0; left: -4px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eSubToolShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); left: 0px; top: 16px; content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eSubToolContentHolder": `overflow: hidden; border-radius: inherit`,
    ".eSubToolContentScroll": `width: fit-content; overflow: auto`,
    ".eSubToolContent": `display: flex; flex-wrap: wrap; gap: 6px`
  },
  tools: {
    "select": [
      {
        id: "select",
        type: "tool",
        image: "cursor.svg"
      },
      {
        id: "drag",
        type: "tool",
        image: "drag.svg"
      }
    ],
    "markup": [
      {
        id: "highlighter",
        type: "tool",
        image: "highlight.svg"
      },
      {
        id: "underline",
        type: "tool",
        image: "drag.svg"
      },
      /*
      {
        id: "tape",
        type: "tool",
        image: "tape.svg"
      },
      */
      {
        type: "divider"
      },
      {
        id: "color",
        type: "option"
      },
      {
        id: "thickness",
        type: "option"
      },
      {
        id: "opacity",
        type: "option"
      }
    ],
    "text": { id: "text", type: "tool" },
    "draw": [
      {
        id: "pen",
        type: "tool",
        image: "pen.svg"
      },
      {
        id: "erase",
        type: "tool",
        image: "erase.svg"
      },
      {
        type: "divider"
      },
      {
        id: "color",
        type: "option"
      },
      {
        id: "thickness",
        type: "option"
      },
      {
        id: "opacity",
        type: "option"
      }
    ],
    "shape": [
      {
        id: "square",
        type: "tool",
        image: "square.svg"
      },
      {
        id: "circle",
        type: "tool",
        image: "circle.svg"
      },
      {
        id: "triangle",
        type: "tool",
        image: "triangle.svg"
      },
      {
        id: "parallelogram",
        type: "tool",
        image: "parallelogram.svg"
      },
      {
        id: "trapezoid",
        type: "tool",
        image: "trapezoid.svg"
      },
      {
        id: "rhombus",
        type: "tool",
        image: "rhombus.svg"
      },
      {
        id: "line",
        type: "tool",
        image: "line.svg"
      },
      {
        id: "polygone",
        type: "tool",
        image: "polygone.svg"
      }
    ],
    "comment": { id: "comment", type: "tool" },
    "media": [
      {
        id: "upload",
        type: "tool",
        image: "image.svg"
      },
      {
        id: "weblink",
        type: "tool",
        image: "embed.svg"
      }
    ]
  },
  js: function (frame) {
    frame.style.maxHeight = "calc(100vh - 132px)";
    frame.style.overflow = "auto";
    frame.style.background = "var(--pageColor)";
    frame.style.boxShadow = "var(--lightShadow)";
    frame.style.borderRadius = "16px";
    frame.style.borderTopRightRadius = "0px";
    frame.style.display = "flex";
    frame.style.flexDirection = "column";
    frame.style.gap = "6px";

    let subTools = frame.querySelector(".eSubToolHolder");
    let subToolContentHolder = subTools.querySelector(".eSubToolContentHolder");
    let subToolContentScroll = subTools.querySelector(".eSubToolContentScroll");
    let subToolContent = subToolContentScroll.querySelector(".eSubToolContent");
    let mainSubtoolButton;
    let updateSubtoolUI = async () => {
      if (mainSubtoolButton == null) {
        return;
      }
      let toolsRect = frame.getBoundingClientRect();
      let buttonRect = mainSubtoolButton.getBoundingClientRect();

      if (subToolContent.childElementCount < 8) {
        subToolContent.style.width = "50px";
      } else {
        subToolContent.style.width = "106px";
      }

      subToolContentScroll.style.maxHeight = frame.clientHeight + "px";

      let subtoolHeight = subToolContentScroll.offsetHeight;
      let setSubToolTop = buttonRect.top - toolsRect.top;
      if (setSubToolTop + subtoolHeight > frame.offsetHeight) {
        setSubToolTop = frame.offsetHeight - subtoolHeight;
      } else if (setSubToolTop < 0) {
        setSubToolTop = 0;
      }
      subTools.style.top = setSubToolTop + "px";
      
      if (setSubToolTop < 17) {
        frame.style.borderTopRightRadius = "0px";
      } else {
        frame.style.borderTopRightRadius = "16px";
      }
      if (setSubToolTop + subtoolHeight > frame.offsetHeight - 16) {
        frame.style.borderBottomRightRadius = "0px";
      } else {
        frame.style.borderBottomRightRadius = "16px";
      }
      subTools.style.transition = "top .3s, opacity .3s, transform .3s";

      subToolContentHolder.style.width = subToolContentScroll.offsetWidth + "px";
      subToolContentHolder.style.height = subToolContentScroll.offsetHeight + "px";

      subTools.style.opacity = 1;
      subTools.style.transform = "scale(1)";

      subToolContentHolder.style.transition = ".3s";
    }
    let closeSubtoolUI = async () => {
      subDropdownOpen = false;
      subTools.style.top = mainSubtoolButton.getBoundingClientRect().top - frame.getBoundingClientRect().top + "px";
      subToolContentHolder.style.transition = "unset";
      subTools.style.transform = "scale(0)";
      subTools.style.opacity = 0;
      frame.style.borderTopRightRadius = "16px";
      frame.style.borderBottomRightRadius = "16px";
      await sleep(300);
      subToolContent.innerHTML = "";
      subToolContentHolder.style.removeProperty("width");
      subToolContentHolder.style.removeProperty("height");
      subTools.style.transition = "opacity .3s, transform .3s";
    }
    let showSubtoolUI = async (button) => {
      mainSubtoolButton = button || mainSubtoolButton;
      
      if (mainSubtoolButton != null) { // SUBTOOL UI
        let toolTag = mainSubtoolButton.getAttribute("tool");
        let loadTools = this.tools[toolTag];
        if (Array.isArray(loadTools) == true) {
          subDropdownOpen = true;
          subToolContent.innerHTML = "";
          for (let i = 0; i < loadTools.length; i++) {
            let toolData = loadTools[i];
            let insertHTML = `<button class="eTool" new><div><img></div></button>`;
            if (toolData.type == "option") {

            } else if (toolData.type == "divider") {
              insertHTML = `<div class="eDivider" new></div>`;
            }
            subToolContent.insertAdjacentHTML("beforeend", insertHTML);
            let newSubItem = subToolContent.querySelector("[new]");
            newSubItem.removeAttribute("new");
            if (toolData.type == "tool") {
              newSubItem.querySelector("img").src = "./images/editor/tools/" + toolTag + "/" + toolData.id + ".svg";
            }
          }

          updateSubtoolUI();
        } else { // No need as the main tool is the subtool
          closeSubtoolUI();
        }
      }
    }
    tempListen(window, "resize", updateSubtoolUI);
    frame.addEventListener("scroll", updateSubtoolUI);
    showSubtoolUI(frame.querySelector('[tool="select"]'));
    frame.addEventListener("click", function (event) {
      let element = event.target;
      if (element == null) {
        return;
      }
      element = element.closest("button");
      if (element == null) {
        return;
      }
      let lastSelected = element.parentElement.querySelector("button[selected]");
      if (lastSelected) {
        lastSelected.removeAttribute("selected");
      }
      element.setAttribute("selected", "");
      showSubtoolUI(element);
    });

    //frame.closest(".eSide").style.opacity = 1;
  }
}