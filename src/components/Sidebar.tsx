import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { Button, Separator } from "@/components/ui";
import { SidebarItem } from "@/components";
import Logo from "@/components/Logo";
import { ClerkLoading, ClerkLoaded, UserButton, SignedIn } from "@clerk/nextjs";
import { getUserProgress } from "@/server/db/queries";
import { sidebarItems } from "@/constants";

type SidebarProps = {
  className?: string;
};

const Sidebar = async ({ className }: SidebarProps) => {
  const user = await currentUser();
  const userProgress = await getUserProgress();

  return (
    <div
      className={cn(
        "left-0 top-0 flex flex-col h-full border-r border-gray-800 bg-black/50 backdrop-blur-sm px-4 md:fixed md:w-[225px] lg:w-[256px]",
        className
      )}
    >
      <Logo />

      <div className="flex flex-1 flex-col gap-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            label={item.label}
            iconSrc={item.iconSrc}
            hasActiveCourse={!!userProgress?.activeCourseId}
          />
        ))}
      </div>

      <Separator className="h-0.5 bg-gray-800" />

      <div className="flex flex-col gap-y-4 mt-4">
        <div className="flex items-center justify-center gap-x-2 mb-4">
          <ClerkLoading>
            <SignedIn>
              <Button
                disabled
                size="rounded"
                className="h-[40px] w-[40px] animate-pulse bg-gray-700 ring ring-border"
              />
              <div className="flex flex-col h-[52px] w-[158px] gap-y-1 p-2">
                <div className="h-16 bg-gray-700 animate-pulse rounded-xl" />
                <div className="h-12 bg-gray-700 animate-pulse rounded-xl" />
              </div>
            </SignedIn>
          </ClerkLoading>

          <ClerkLoaded>
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonPopoverCard: {
                      pointerEvents: "initial",
                      width: "300px",
                    },
                    userButtonAvatarBox: {
                      height: "40px",
                      width: "40px",
                    },
                  },
                }}
              />
              <div className="flex flex-col w-full p-2">
                <span className="text-sm font-bold text-white">
                  {user?.firstName || "Anon"}
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;