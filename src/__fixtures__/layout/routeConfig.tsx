import Pages from "../pages"



export const authRoute = {
    path: "/auth",
    component: Pages.AuthPage,
}

export const routes = {
    user: {
        path: "/username",
        component: Pages.UserPage,
        i18Name: "myProfile"
    },
    chart: {
        path: "/chart",
        component: Pages.ChartPage,
        i18Name: "chart"
    },
    weather: {
        path: "/weather",
        component: Pages.WeatherPage,
        i18Name: "weather"
    },
    about: {
        path: "/about",
        component: Pages.AboutPage,
        i18Name: "about"
    },
    qna: {
        path: "/qa",
        component: Pages.QaPage,
        i18Name: "qa"
    }
}
