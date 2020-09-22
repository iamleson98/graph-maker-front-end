import React, { Suspense } from "react"
import { useTranslation } from "react-i18next"


function Welcome() {
    const { t } = useTranslation();

    return (
        <div>
            {t("title")}
        </div>
    )
}

// page uses the hook
function Page() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="App">
            <div className="App-header">
                <Welcome />
                <button onClick={() => changeLanguage('vi')}>vi</button>
                <button onClick={() => changeLanguage('en')}>en</button>
            </div>
            <div className="App-intro">
                {/* <MyComponent /> */}
            </div>
            <div>{t('description.part2')}</div>
            <div>{t('description.part1')}</div>
        </div>
    );
}

export default function App() {
    return (
        <Suspense fallback={<p>loading...</p>}>
            <Page />
        </Suspense>
    );
}