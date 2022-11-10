import LinkBar from "../components/LinkBar";
import Page from "../components/Page";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Major", href: "#" },
];

export default function Major(){
    return (
        <Page title="Major">
        <LinkBar array={BREADCRUMBS}></LinkBar>
            Hello Welcome to Major Page
        </Page>
    )
}