import LinkBar from "../components/LinkBar";
import Page from "../components/Page";

const BREADCRUMBS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Course", href: "#" },
];

export default function Course(){
    return (
        <Page title="Course">
        <LinkBar array={BREADCRUMBS}></LinkBar>
            Hello Welcome to Course Page
        </Page>
    )
}