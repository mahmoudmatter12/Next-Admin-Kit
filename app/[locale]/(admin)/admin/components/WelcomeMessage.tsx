'use client';

import React from 'react';
import { useCurrentUser } from '@/contexts/userContext';
import { adminConfig } from '../../_Components/config/admin-config';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

function WelcomeMessage() {
  const user = useCurrentUser();

  if (!adminConfig.welcome.enabled) {
    return null;
  }

  const greeting =
    adminConfig.welcome.showUserGreeting && user?.name
      ? `Welcome back, ${user.name}!`
      : adminConfig.welcome.title;

  return (
    <Card className='bg-setup-primary border-setup-secondary'>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold text-setup-text'>
          {greeting}
        </CardTitle>
        <CardDescription className='text-setup-text/70'>
          {adminConfig.welcome.description}
        </CardDescription>
      </CardHeader>
      {adminConfig.welcome.customContent && (
        <CardContent>{adminConfig.welcome.customContent}</CardContent>
      )}
    </Card>
  );
}

export default WelcomeMessage;
