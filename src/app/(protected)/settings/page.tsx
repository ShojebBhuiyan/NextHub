import KeyList from "@/components/settings/key-list";
import SettingsForm from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <div className="container space-y-4">
      {/* <h1 className="text-4xl font-semibold">Settings</h1> */}
      <KeyList />
      <SettingsForm />
    </div>
  );
}
