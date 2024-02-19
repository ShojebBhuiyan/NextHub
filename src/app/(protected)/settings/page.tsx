import KeyList from "@/components/settings/key-list";
import SettingsForm from "@/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <div className="container space-y-4">
      <SettingsForm />
      <KeyList />
    </div>
  );
}
