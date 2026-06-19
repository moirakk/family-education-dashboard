"use client";

import { useMemo, useState } from "react";
import { CalendarCheck2, Clock3, GraduationCap, Target } from "lucide-react";
import { AppShell } from "@/components/dashboard/app-shell";
import { ChildManagement } from "@/components/dashboard/child-management";
import { ChildProfile } from "@/components/dashboard/child-profile";
import { EducationRoadmap } from "@/components/dashboard/education-roadmap";
import { GrowthSummary } from "@/components/dashboard/growth-summary";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ResourceCenter } from "@/components/dashboard/resource-center";
import { UnifiedCalendar } from "@/components/dashboard/unified-calendar";
import { UpcomingEvents } from "@/components/dashboard/upcoming-events";
import { WeeklyOverview } from "@/components/dashboard/weekly-overview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calendarEvents, children, educationGoals, learningRecords, resources } from "@/lib/mock-data";

export default function Home() {
  const [managedChildren, setManagedChildren] = useState(children);
  const [selectedChildId, setSelectedChildId] = useState(children[0].id);

  const selectedChild = useMemo(
    () => managedChildren.find((child) => child.id === selectedChildId) ?? managedChildren[0],
    [managedChildren, selectedChildId]
  );

  const totalMinutes = learningRecords.reduce((sum, record) => sum + record.durationMinutes, 0);
  const averageGoalProgress = Math.round(
    educationGoals.reduce((sum, goal) => sum + goal.progress, 0) / educationGoals.length
  );

  return (
    <AppShell>
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Family Education Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">This week across three children</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              A calm operating system for school, tutoring, activities, exams, learning records, resources, and long-term education planning.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Export report</Button>
            <Button>Add event</Button>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="Weekly events" value={String(calendarEvents.length)} detail="Across all categories" icon={CalendarCheck2} tone="blue" />
          <MetricCard title="Study time" value={`${totalMinutes}m`} detail="Logged this week" icon={Clock3} tone="teal" />
          <MetricCard title="Active goals" value={String(educationGoals.length)} detail={`${averageGoalProgress}% average progress`} icon={Target} tone="amber" />
          <MetricCard title="Children" value={String(managedChildren.length)} detail="Pilot family configured" icon={GraduationCap} tone="rose" />
        </section>

        <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <WeeklyOverview events={calendarEvents} childProfiles={managedChildren} />
          <UpcomingEvents events={calendarEvents} childProfiles={managedChildren} />
        </div>

        <ChildManagement
          childProfiles={managedChildren}
          setChildren={setManagedChildren}
          selectedChildId={selectedChildId}
          onSelectChild={setSelectedChildId}
        />

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid h-auto w-full grid-cols-2 sm:inline-flex sm:w-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ChildProfile child={selectedChild} records={learningRecords} goals={educationGoals} />
          </TabsContent>
          <TabsContent value="calendar">
            <UnifiedCalendar events={calendarEvents} childProfiles={managedChildren} />
          </TabsContent>
          <TabsContent value="growth">
            <GrowthSummary childProfiles={managedChildren} records={learningRecords} goals={educationGoals} />
          </TabsContent>
          <TabsContent value="roadmap">
            <EducationRoadmap goals={educationGoals} childProfiles={managedChildren} />
          </TabsContent>
          <TabsContent value="resources">
            <ResourceCenter resources={resources} childProfiles={managedChildren} />
          </TabsContent>
        </Tabs>

        <div className="grid gap-5 xl:grid-cols-2">
          <GrowthSummary childProfiles={managedChildren} records={learningRecords} goals={educationGoals} />
          <ChildProfile child={selectedChild} records={learningRecords} goals={educationGoals} />
        </div>

        <UnifiedCalendar events={calendarEvents} childProfiles={managedChildren} />
        <EducationRoadmap goals={educationGoals} childProfiles={managedChildren} />
        <ResourceCenter resources={resources} childProfiles={managedChildren} />
      </div>
    </AppShell>
  );
}
