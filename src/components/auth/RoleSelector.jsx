"use client";

const roles = ["Attendee", "Organizer"];

const RoleSelector = ({
  role,
  setRole,
  error,
}) => {
  const labelStyle =
    "text-sm font-medium text-zinc-700 dark:text-zinc-300";

  return (
    <div className="flex flex-col gap-2">
      <label className={labelStyle}>
        Choose Role
      </label>

      <div className="flex gap-2">
        {roles.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setRole(item)}
            className={`px-6 py-2 w-full rounded-lg border text-sm font-medium transition-all ${
              role === item
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-zinc-200 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default RoleSelector;