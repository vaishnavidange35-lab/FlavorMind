import React from "react";
import { FadeIn } from "../components/ui/FadeIn.jsx";
import { GlassCard } from "../components/ui/GlassCard.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";
import { User, Mail, Bell, Shield } from "lucide-react";
export const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <FadeIn>
        <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
          Account Settings
        </h1>
        <p className="text-slate-500">
          Manage your profile, palate preferences, and security.
        </p>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {" "}
        {/* Settings Nav (Desktop) */}{" "}
        <div className="hidden md:block col-span-1 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-primary bg-white/5"
          >
            Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-500"
          >
            Preferences
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-500"
          >
            Notifications
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-500"
          >
            Security
          </Button>
        </div>{" "}
        {/* Content */}{" "}
        <div className="col-span-1 md:col-span-3 space-y-8">
          <FadeIn delay={0.1}>
            <GlassCard className="p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-violet-500 to-emerald-400 p-[2px]">
                  <img
                    src="https://i.pravatar.cc/150?img=3"
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover border-4 border-obsidian-900"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Chef Gordon</h3>
                  <p className="text-slate-500 text-sm">Pro Member</p>
                  <Button variant="secondary" size="sm" className="mt-3">
                    Change Avatar
                  </Button>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-500 block mb-2">
                    Full Name
                  </label>
                  <Input icon={User} defaultValue="Gordon Ramsay" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500 block mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    icon={Mail}
                    defaultValue="chef@flavormind.ai"
                  />
                </div>
              </div>
              <Button variant="primary" className="mt-6">
                Save Changes
              </Button>
            </GlassCard>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GlassCard className="p-8 border-slate-700/40">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Session Preferences
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Update how the app behaves for your kitchen workflow and
                recommended dishes.
              </p>
              <Button
                variant="secondary"
                className="text-slate-900 hover:text-slate-900 hover:bg-white/10 gap-2"
              >
                {" "}
                Save Preferences{" "}
              </Button>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};
