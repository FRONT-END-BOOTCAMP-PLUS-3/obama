"use client"

import ProfileHeader from "./ProfileHeader";
import { PageContainer, Section } from "./ProfilePage.Styled";

const ProfilePage: React.FC = () => {

  return (
    <PageContainer>
      <Section>
        <ProfileHeader userId={""} />
      </Section>
    </PageContainer>
  );
};

export default ProfilePage;
