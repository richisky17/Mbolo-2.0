"use client";

import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import {
  BookOpen,
  Grid3x3,
  GraduationCap,
  HelpCircle,
  List,
  CreditCard,
  Settings,
  History,
  FileText,
  Share2,
  Mic,
} from "lucide-react";

import "./admin.css";

import {
  CourseList,
  CourseCreate,
  CourseEdit,
} from "../../components/admin/course";

import { UnitList, UnitCreate, UnitEdit } from "../../components/admin/unit";

import {
  LessonList,
  LessonCreate,
  LessonEdit,
} from "../../components/admin/lesson";

import {
  ChallengeList,
  ChallengeCreate,
  ChallengeEdit,
} from "../../components/admin/challenge";

import {
  ChallengeOptionList,
  ChallengeOptionCreate,
  ChallengeOptionEdit,
} from "../../components/admin/challenge-option";

import {
  SubscriptionList,
  SubscriptionShow,
} from "../../components/admin/subscription";

import {
  SettingsList,
  SettingsCreate,
  SettingsEdit,
} from "../../components/admin/settings";

import {
  ChangelogList,
  ChangelogShow,
} from "../../components/admin/changelog";

import {
  PageList,
  PageCreate,
  PageEdit,
} from "../../components/admin/page";

import {
  SocialMediaLinkList,
  SocialMediaLinkCreate,
  SocialMediaLinkEdit,
} from "../../components/admin/social-media-link";

import {
  PronunciationTextList,
  PronunciationTextCreate,
  PronunciationTextEdit,
} from "../../components/admin/pronunciation-text";

import { AdminLayout } from "../../components/admin/AdminLayout";
import { adminTheme } from "../../components/admin/AdminTheme";
import { AdminDashboard } from "../../components/admin/AdminDashboard";

const dataProvider = simpleRestProvider("/api");

// Demo Mode - Read Only
const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

const App = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      layout={AdminLayout}
      theme={adminTheme}
      title={IS_DEMO ? "Mbolo Admin (Read-Only Demo)" : "Mbolo Admin"}
      dashboard={AdminDashboard}
    >
      <Resource
        name="courses"
        list={CourseList}
        create={IS_DEMO ? undefined : CourseCreate}
        edit={IS_DEMO ? undefined : CourseEdit}
        recordRepresentation="title"
        icon={BookOpen}
      />

      <Resource
        name="units"
        list={UnitList}
        create={IS_DEMO ? undefined : UnitCreate}
        edit={IS_DEMO ? undefined : UnitEdit}
        recordRepresentation="title"
        icon={Grid3x3}
      />

      <Resource
        name="lessons"
        list={LessonList}
        create={IS_DEMO ? undefined : LessonCreate}
        edit={IS_DEMO ? undefined : LessonEdit}
        recordRepresentation="title"
        icon={GraduationCap}
      />

      <Resource
        name="challenges"
        list={ChallengeList}
        create={IS_DEMO ? undefined : ChallengeCreate}
        edit={IS_DEMO ? undefined : ChallengeEdit}
        recordRepresentation="question"
        icon={HelpCircle}
      />

      <Resource
        name="challengeOptions"
        list={ChallengeOptionList}
        create={IS_DEMO ? undefined : ChallengeOptionCreate}
        edit={IS_DEMO ? undefined : ChallengeOptionEdit}
        recordRepresentation="text"
        options={{ label: "Challenge Options" }}
        icon={List}
      />

      <Resource
        name="userSubscription"
        list={SubscriptionList}
        show={SubscriptionShow}
        recordRepresentation="id"
        options={{ label: "Subscriptions" }}
        icon={CreditCard}
      />

      <Resource
        name="settings"
        list={SettingsList}
        create={IS_DEMO ? undefined : SettingsCreate}
        edit={IS_DEMO ? undefined : SettingsEdit}
        recordRepresentation="key"
        options={{ label: "Settings" }}
        icon={Settings}
      />

      <Resource
        name="changelog"
        list={ChangelogList}
        show={ChangelogShow}
        recordRepresentation="id"
        options={{ label: "Changelog" }}
        icon={History}
      />

      <Resource
        name="pages"
        list={PageList}
        create={IS_DEMO ? undefined : PageCreate}
        edit={IS_DEMO ? undefined : PageEdit}
        recordRepresentation="title"
        options={{ label: "Pages" }}
        icon={FileText}
      />

      <Resource
        name="social-media-links"
        list={SocialMediaLinkList}
        create={IS_DEMO ? undefined : SocialMediaLinkCreate}
        edit={IS_DEMO ? undefined : SocialMediaLinkEdit}
        recordRepresentation="platform"
        options={{ label: "Social Media Links" }}
        icon={Share2}
      />

      <Resource
        name="pronunciation-texts"
        list={PronunciationTextList}
        create={IS_DEMO ? undefined : PronunciationTextCreate}
        edit={IS_DEMO ? undefined : PronunciationTextEdit}
        recordRepresentation="text"
        options={{ label: "Pronunciation Texts" }}
        icon={Mic}
      />
    </Admin>
  );
};

export default App;
