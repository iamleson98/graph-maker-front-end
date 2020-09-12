import React, { memo } from "react"


function Logo() {
    return (
        <svg width="140" height="22" viewBox="0 0 140 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.664 21.448C4.55467 21.448 3.00533 20.916 2.016 19.852C1.02667 18.788 0.532 17.024 0.532 14.56C0.532 12.6 0.858667 10.4907 1.512 8.232C2.184 5.97333 3.248 4.04133 4.704 2.436C6.17867 0.811998 8.04533 -1.66893e-06 10.304 -1.66893e-06C11.704 -1.66893e-06 12.8333 0.307999 13.692 0.924C14.5507 1.54 14.98 2.48267 14.98 3.752C14.98 4.55467 14.8213 5.18933 14.504 5.656C14.1867 6.104 13.692 6.328 13.02 6.328C12.348 6.328 11.816 6.08533 11.424 5.6C11.76 5.432 12.0587 5.096 12.32 4.592C12.5813 4.088 12.712 3.56533 12.712 3.024C12.712 2.52 12.572 2.10933 12.292 1.792C12.0307 1.47467 11.6013 1.316 11.004 1.316C10.0147 1.316 9.072 1.99733 8.176 3.36C7.28 4.704 6.552 6.40267 5.992 8.456C5.45067 10.5093 5.18 12.488 5.18 14.392C5.18 15.8107 5.42267 16.8933 5.908 17.64C6.39333 18.3867 7.27067 18.76 8.54 18.76C9.64133 18.76 10.6587 18.5173 11.592 18.032C12.5253 17.5467 13.328 16.856 14 15.96L14.644 16.24C14.1773 17.416 13.4867 18.396 12.572 19.18C11.6573 19.964 10.6773 20.5427 9.632 20.916C8.58667 21.2707 7.59733 21.448 6.664 21.448ZM24.026 21.168C22.8873 21.168 22.0473 20.8693 21.506 20.272C20.9833 19.656 20.722 18.9 20.722 18.004C20.722 17.612 20.7686 17.1733 20.862 16.688C20.9553 16.184 21.0486 15.6987 21.142 15.232C21.254 14.7653 21.3286 14.4667 21.366 14.336C21.5153 13.6827 21.6553 13.0387 21.786 12.404C21.9166 11.7693 21.982 11.256 21.982 10.864C21.982 9.912 21.646 9.436 20.974 9.436C20.4886 9.436 20.0593 9.67867 19.686 10.164C19.3126 10.6307 19.014 11.2467 18.79 12.012L16.886 21H12.854L16.914 1.96L21.058 1.4L19.546 8.456C20.4793 7.41067 21.5713 6.888 22.822 6.888C23.774 6.888 24.53 7.14933 25.09 7.672C25.65 8.19467 25.93 8.988 25.93 10.052C25.93 10.5933 25.8646 11.2 25.734 11.872C25.6033 12.5253 25.4166 13.328 25.174 14.28C25.0246 14.8587 24.8846 15.428 24.754 15.988C24.642 16.5293 24.586 16.9587 24.586 17.276C24.586 17.6493 24.67 17.9387 24.838 18.144C25.006 18.3493 25.2953 18.452 25.706 18.452C26.266 18.452 26.714 18.256 27.05 17.864C27.386 17.4533 27.722 16.828 28.058 15.988H29.234C28.5433 18.0413 27.7406 19.4227 26.826 20.132C25.93 20.8227 24.9966 21.168 24.026 21.168ZM31.4147 21.168C30.3507 21.168 29.464 20.804 28.7547 20.076C28.0454 19.348 27.6907 18.2093 27.6907 16.66C27.6907 15.2787 27.9614 13.832 28.5027 12.32C29.0627 10.7893 29.884 9.50133 30.9667 8.456C32.068 7.392 33.3747 6.86 34.8867 6.86C35.652 6.86 36.2214 6.99067 36.5947 7.252C36.968 7.51333 37.1547 7.85867 37.1547 8.288V8.484L37.4627 7H41.4947L39.4787 16.52C39.404 16.8 39.3667 17.0987 39.3667 17.416C39.3667 18.2187 39.7494 18.62 40.5147 18.62C41.0374 18.62 41.4854 18.3773 41.8587 17.892C42.2507 17.4067 42.5587 16.772 42.7827 15.988H43.9587C43.268 18.004 42.4094 19.376 41.3827 20.104C40.3747 20.8133 39.3574 21.168 38.3307 21.168C37.5467 21.168 36.912 20.9533 36.4267 20.524C35.96 20.076 35.68 19.432 35.5867 18.592C35.0454 19.3573 34.4387 19.9827 33.7667 20.468C33.1134 20.9347 32.3294 21.168 31.4147 21.168ZM33.2347 18.452C33.7014 18.452 34.1587 18.2373 34.6067 17.808C35.0734 17.36 35.3907 16.7533 35.5587 15.988L36.9027 9.66C36.9027 9.41733 36.8094 9.184 36.6227 8.96C36.436 8.71733 36.1467 8.596 35.7547 8.596C35.008 8.596 34.336 9.03467 33.7387 9.912C33.1414 10.7707 32.6747 11.816 32.3387 13.048C32.0027 14.2613 31.8347 15.3347 31.8347 16.268C31.8347 17.2013 31.9654 17.7987 32.2267 18.06C32.5067 18.3213 32.8427 18.452 33.2347 18.452ZM44.697 7H48.729L48.365 8.736C48.9996 8.176 49.569 7.74667 50.073 7.448C50.5956 7.14933 51.1556 7 51.753 7C52.3503 7 52.817 7.20533 53.153 7.616C53.5076 8.02667 53.685 8.52133 53.685 9.1C53.685 9.64133 53.5076 10.1173 53.153 10.528C52.7983 10.9387 52.3036 11.144 51.669 11.144C51.2583 11.144 50.9783 11.0507 50.829 10.864C50.6983 10.6587 50.5956 10.3693 50.521 9.996C50.465 9.75333 50.409 9.576 50.353 9.464C50.297 9.352 50.1943 9.296 50.045 9.296C49.653 9.296 49.317 9.38 49.037 9.548C48.7756 9.69733 48.4303 9.968 48.001 10.36L45.761 21H41.729L44.697 7ZM55.9523 21.168C55.0003 21.168 54.291 20.8787 53.8243 20.3C53.3763 19.7213 53.1523 18.956 53.1523 18.004C53.1523 17.5187 53.2083 17.024 53.3203 16.52L55.1123 8.12H54.1883L54.4123 7H55.3363L56.1763 3.136L60.3203 2.576C60.1523 3.28533 60.059 3.70533 60.0403 3.836C59.9096 4.35867 59.6856 5.41333 59.3683 7H61.0483L60.8243 8.12H59.1443L57.3523 16.52C57.259 16.9307 57.2123 17.2573 57.2123 17.5C57.2123 18.172 57.539 18.508 58.1923 18.508C58.5283 18.508 58.771 18.48 58.9203 18.424C58.547 19.5067 58.1083 20.2347 57.6043 20.608C57.1003 20.9813 56.5496 21.168 55.9523 21.168ZM84.1529 21.168C83.0142 21.168 82.1742 20.8693 81.6329 20.272C81.1102 19.656 80.8489 18.9 80.8489 18.004C80.8489 17.612 80.8956 17.1733 80.9889 16.688C81.0822 16.184 81.1756 15.6987 81.2689 15.232C81.3809 14.7653 81.4556 14.4667 81.4929 14.336C81.6422 13.6827 81.7822 13.0387 81.9129 12.404C82.0436 11.7693 82.1089 11.256 82.1089 10.864C82.1089 9.912 81.7729 9.436 81.1009 9.436C80.6156 9.436 80.1862 9.67867 79.8129 10.164C79.4396 10.6307 79.1409 11.2467 78.9169 12.012L77.0129 21H72.9809L75.0249 11.34C75.0809 11.116 75.1089 10.8827 75.1089 10.64C75.1089 9.81867 74.8289 9.408 74.2689 9.408C73.7462 9.408 73.2889 9.65067 72.8969 10.136C72.5236 10.6027 72.2249 11.228 72.0009 12.012L70.0969 21H66.0649L69.0329 7H73.0649L72.7569 8.456C73.7089 7.392 74.8476 6.86 76.1729 6.86C77.8156 6.86 78.7769 7.66267 79.0569 9.268C80.0836 7.68133 81.3809 6.888 82.9489 6.888C83.9009 6.888 84.6569 7.14933 85.2169 7.672C85.7769 8.19467 86.0569 8.988 86.0569 10.052C86.0569 10.5933 85.9916 11.2 85.8609 11.872C85.7302 12.5253 85.5436 13.328 85.3009 14.28C85.1516 14.8587 85.0116 15.428 84.8809 15.988C84.7689 16.5293 84.7129 16.9587 84.7129 17.276C84.7129 17.6493 84.7969 17.9387 84.9649 18.144C85.1329 18.3493 85.4222 18.452 85.8329 18.452C86.3929 18.452 86.8409 18.256 87.1769 17.864C87.5129 17.4533 87.8489 16.828 88.1849 15.988H89.3609C88.6702 18.0413 87.8676 19.4227 86.9529 20.132C86.0569 20.8227 85.1236 21.168 84.1529 21.168ZM91.5436 21.168C90.4796 21.168 89.5929 20.804 88.8836 20.076C88.1743 19.348 87.8196 18.2093 87.8196 16.66C87.8196 15.2787 88.0903 13.832 88.6316 12.32C89.1916 10.7893 90.0129 9.50133 91.0956 8.456C92.1969 7.392 93.5036 6.86 95.0156 6.86C95.7809 6.86 96.3503 6.99067 96.7236 7.252C97.0969 7.51333 97.2836 7.85867 97.2836 8.288V8.484L97.5916 7H101.624L99.6076 16.52C99.5329 16.8 99.4956 17.0987 99.4956 17.416C99.4956 18.2187 99.8783 18.62 100.644 18.62C101.166 18.62 101.614 18.3773 101.988 17.892C102.38 17.4067 102.688 16.772 102.912 15.988H104.088C103.397 18.004 102.538 19.376 101.512 20.104C100.504 20.8133 99.4863 21.168 98.4596 21.168C97.6756 21.168 97.0409 20.9533 96.5556 20.524C96.0889 20.076 95.8089 19.432 95.7156 18.592C95.1743 19.3573 94.5676 19.9827 93.8956 20.468C93.2423 20.9347 92.4583 21.168 91.5436 21.168ZM93.3636 18.452C93.8303 18.452 94.2876 18.2373 94.7356 17.808C95.2023 17.36 95.5196 16.7533 95.6876 15.988L97.0316 9.66C97.0316 9.41733 96.9383 9.184 96.7516 8.96C96.5649 8.71733 96.2756 8.596 95.8836 8.596C95.1369 8.596 94.4649 9.03467 93.8676 9.912C93.2703 10.7707 92.8036 11.816 92.4676 13.048C92.1316 14.2613 91.9636 15.3347 91.9636 16.268C91.9636 17.2013 92.0943 17.7987 92.3556 18.06C92.6356 18.3213 92.9716 18.452 93.3636 18.452ZM113.45 21.168C112.293 21.168 111.415 20.8973 110.818 20.356C110.221 19.796 109.922 19.0027 109.922 17.976C109.922 17.528 109.978 17.0427 110.09 16.52L110.314 15.428C110.389 15.1107 110.426 14.7653 110.426 14.392C110.426 13.496 110.09 13.048 109.418 13.048C109.119 13.048 108.802 13.132 108.466 13.3C108.149 13.468 107.775 13.7293 107.346 14.084L105.89 21H101.858L105.918 1.96L110.062 1.4L107.962 11.256L113.366 7H116.138L110.538 10.892C110.818 10.8173 111.126 10.78 111.462 10.78C112.47 10.78 113.235 11.088 113.758 11.704C114.281 12.32 114.542 13.104 114.542 14.056C114.542 14.448 114.505 14.8027 114.43 15.12L114.122 16.52C114.029 16.856 113.982 17.1547 113.982 17.416C113.982 18.1067 114.346 18.452 115.074 18.452C115.634 18.452 116.082 18.256 116.418 17.864C116.754 17.4533 117.09 16.828 117.426 15.988H118.602C117.445 19.4413 115.727 21.168 113.45 21.168ZM121.418 21.168C120.037 21.168 118.963 20.8133 118.198 20.104C117.433 19.376 117.05 18.2467 117.05 16.716C117.05 15.428 117.302 14.0093 117.806 12.46C118.31 10.9107 119.131 9.576 120.27 8.456C121.409 7.31733 122.855 6.748 124.61 6.748C126.663 6.748 127.69 7.644 127.69 9.436C127.69 10.4813 127.391 11.4427 126.794 12.32C126.197 13.1973 125.403 13.9067 124.414 14.448C123.425 14.9707 122.37 15.2693 121.25 15.344C121.213 15.904 121.194 16.2773 121.194 16.464C121.194 17.3787 121.353 18.004 121.67 18.34C121.987 18.6573 122.501 18.816 123.21 18.816C124.218 18.816 125.077 18.5827 125.786 18.116C126.514 17.6493 127.307 16.94 128.166 15.988H129.118C127.046 19.4413 124.479 21.168 121.418 21.168ZM121.474 14C122.165 13.9627 122.818 13.72 123.434 13.272C124.069 12.824 124.573 12.2547 124.946 11.564C125.338 10.8733 125.534 10.1453 125.534 9.38C125.534 8.61467 125.301 8.232 124.834 8.232C124.162 8.232 123.499 8.82 122.846 9.996C122.211 11.172 121.754 12.5067 121.474 14ZM130.064 7H134.096L133.732 8.736C134.367 8.176 134.936 7.74667 135.44 7.448C135.963 7.14933 136.523 7 137.12 7C137.717 7 138.184 7.20533 138.52 7.616C138.875 8.02667 139.052 8.52133 139.052 9.1C139.052 9.64133 138.875 10.1173 138.52 10.528C138.165 10.9387 137.671 11.144 137.036 11.144C136.625 11.144 136.345 11.0507 136.196 10.864C136.065 10.6587 135.963 10.3693 135.888 9.996C135.832 9.75333 135.776 9.576 135.72 9.464C135.664 9.352 135.561 9.296 135.412 9.296C135.02 9.296 134.684 9.38 134.404 9.548C134.143 9.69733 133.797 9.968 133.368 10.36L131.128 21H127.096L130.064 7Z" fill="#FF7C7C" />
        </svg>
    )
}

export default memo(Logo)
