import { type ChangeEvent, useMemo, useRef, useState } from "react";
import { Eye, GraduationCap, Pencil, Power, PowerOff, Upload, UserRound, UserRoundPlus, Users } from "lucide-react";

import { DashboardNavItem } from "@/src/components/dashboard/DashboardNavItem";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { settingsUsers } from "@/src/data/settings-users";

type SettingsSectionId = "profile" | "academic" | "users";

type ProfileFormState = {
  fullName: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const settingsSections: Array<{ id: SettingsSectionId; label: string; icon: typeof UserRound }> = [
  { id: "profile", label: "Perfil", icon: UserRound },
  { id: "academic", label: "Acadêmico", icon: GraduationCap },
  { id: "users", label: "Usuários", icon: Users }
];

const defaultProfileForm: ProfileFormState = {
  fullName: "Ana Silva",
  email: "ana.silva@escola.com.br",
  phone: "(11) 98765-4321",
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
};

const ALLOWED_PROFILE_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_PROFILE_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function SettingsPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <Card
      className="gap-3 rounded-3xl border border-[var(--color-border-primary)] bg-[var(--color-surface-card)] p-6"
      aria-live="polite"
    >
      <h2 className="m-0 text-[var(--text-heading-h6-size)] font-semibold leading-[var(--text-heading-6-line-height)] text-[var(--color-content-primary)]">
        {title}
      </h2>
      <p className="m-0 text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] text-[var(--color-content-tertiary)]">
        {description}
      </p>
      <Button size="sm" className="w-fit">
        Salvar alterações
      </Button>
    </Card>
  );
}

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSectionId>("profile");
  const [profileForm, setProfileForm] = useState<ProfileFormState>(defaultProfileForm);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [users, setUsers] = useState(settingsUsers);
  const profileFileInputRef = useRef<HTMLInputElement | null>(null);

  const profileImageLabel = useMemo(() => {
    if (!profileImage) {
      return "Nenhum arquivo selecionado";
    }

    return `${profileImage.name} • ${formatFileSize(profileImage.size)}`;
  }, [profileImage]);

  const profileSummary =
    profileForm.fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((namePart) => namePart[0]?.toUpperCase() ?? "")
      .join("") || "AS";

  const updateField =
    (field: keyof ProfileFormState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setProfileForm((current) => ({
        ...current,
        [field]: event.target.value
      }));

      if (errorMessage) {
        setErrorMessage("");
      }

      if (successMessage) {
        setSuccessMessage("");
      }
    };

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setProfileImage(null);
      return;
    }

    if (!ALLOWED_PROFILE_IMAGE_TYPES.includes(file.type)) {
      setErrorMessage("Formato de arquivo inválido. Use JPG, PNG ou WEBP.");
      setSuccessMessage("");
      setProfileImage(null);
      event.target.value = "";
      return;
    }

    if (file.size > MAX_PROFILE_IMAGE_SIZE_BYTES) {
      setErrorMessage("Arquivo muito grande. O tamanho máximo é 5 MB.");
      setSuccessMessage("");
      setProfileImage(null);
      event.target.value = "";
      return;
    }

    setProfileImage(file);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSaveProfile = () => {
    if (!profileForm.fullName.trim() || !profileForm.email.trim() || !profileForm.phone.trim()) {
      setErrorMessage("Preencha nome, e-mail e telefone para continuar.");
      setSuccessMessage("");
      return;
    }

    if (profileForm.newPassword || profileForm.confirmPassword || profileForm.currentPassword) {
      if (!profileForm.currentPassword) {
        setErrorMessage("Informe sua senha atual para alterar a senha.");
        setSuccessMessage("");
        return;
      }

      if (profileForm.newPassword.length < 6) {
        setErrorMessage("A nova senha deve ter no mínimo 6 caracteres.");
        setSuccessMessage("");
        return;
      }

      if (profileForm.newPassword !== profileForm.confirmPassword) {
        setErrorMessage("A confirmação de senha precisa ser igual à nova senha.");
        setSuccessMessage("");
        return;
      }
    }

    setErrorMessage("");
    setSuccessMessage("Alterações salvas com sucesso.");
    setProfileForm((current) => ({
      ...current,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  const handleToggleUserStatus = (userId: number) => {
    const selectedUser = users.find((user) => user.id === userId);
    if (!selectedUser) {
      return;
    }

    const isActive = selectedUser.status === "Ativo";
    const confirmed = window.confirm(
      isActive
        ? `Deseja desativar o usuário ${selectedUser.name}?`
        : `Deseja ativar o usuário ${selectedUser.name}?`
    );

    if (!confirmed) {
      return;
    }

    setUsers((current) =>
      current.map((user) => {
        if (user.id !== userId) {
          return user;
        }

        return {
          ...user,
          status: user.status === "Ativo" ? "Inativo" : "Ativo"
        };
      })
    );
  };

  return (
    <main className="flex flex-1 p-3 sm:p-4 lg:p-6">
      <div className="grid w-full gap-4 lg:grid-cols-[minmax(220px,227px)_minmax(0,1fr)] lg:gap-6">
        <aside className="flex flex-col gap-4 lg:gap-6" aria-label="Seções de configurações">
          <header>
            <h1 className="m-0 text-[var(--text-heading-h6-size)] font-semibold leading-[var(--text-heading-6-line-height)] text-[var(--color-content-primary)]">
              Configurações
            </h1>
            <p className="mt-2 mb-0 text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] text-[var(--color-content-tertiary)]">
              Gerencie as configurações do sistema
            </p>
          </header>

          <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {settingsSections.map((section) => (
              <DashboardNavItem
                key={section.id}
                icon={section.icon}
                label={section.label}
                isActive={section.id === activeSection}
                onClick={() => setActiveSection(section.id)}
              />
            ))}
          </nav>
        </aside>

        <section className={activeSection === "users" ? "w-full" : "w-full max-w-[671px]"}>
          {activeSection === "profile" ? (
            <>
              <header>
                <h2 className="m-0 text-[var(--text-heading-h6-size)] font-semibold leading-[var(--text-heading-6-line-height)] text-[var(--color-content-primary)]">
                  Perfil
                </h2>
                <p className="mt-1 mb-0 text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] text-[var(--color-content-tertiary)]">
                  Gerencie suas informações pessoais e preferências de conta
                </p>
              </header>

              <Card className="mt-4 gap-7 rounded-3xl border border-[var(--color-border-primary)] bg-[var(--color-surface-card)] p-5 sm:p-6">
                <section className="flex flex-col gap-2">
                  <h3 className="m-0 text-[var(--text-body-medium-size)] font-semibold leading-[var(--text-body-line-height)] text-[var(--color-content-primary)]">
                    Foto de perfil
                  </h3>

                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <div
                      className="inline-flex h-24 w-24 items-center justify-center rounded-full border border-[var(--color-border-primary)] text-[var(--text-body-x-large-size)] font-semibold text-[var(--color-content-tertiary)]"
                      aria-hidden="true"
                    >
                      {profileSummary}
                    </div>

                    <input ref={profileFileInputRef} type="file" accept="image/*" onChange={handleProfileImageChange} className="sr-only" />
                    <Button
                      size="sm"
                      variant="secondary"
                      icon={<Upload aria-hidden="true" className="h-[18px] w-[18px]" />}
                      onClick={() => profileFileInputRef.current?.click()}
                    >
                      Escolher arquivo
                    </Button>
                  </div>

                  <small className="text-[var(--text-body-small-size)] leading-[1.35] text-[var(--color-content-tertiary)]">{profileImageLabel}</small>
                </section>

                <Input label="Nome completo" value={profileForm.fullName} onChange={updateField("fullName")} fieldClassName="gap-2" />
                <Input label="E-mail" type="email" value={profileForm.email} onChange={updateField("email")} fieldClassName="gap-2" />
                <Input label="Telefone" value={profileForm.phone} onChange={updateField("phone")} fieldClassName="gap-2" />

                <hr className="h-px w-full border-0 bg-[var(--color-border-primary)]" />

                <h3 className="m-0 text-[var(--text-body-x-large-size)] font-semibold leading-[var(--text-body-line-height)] text-[var(--color-content-primary)]">
                  Alterar senha
                </h3>

                <div className="relative">
                  <Input
                    label="Senha atual"
                    type={showCurrentPassword ? "text" : "password"}
                    value={profileForm.currentPassword}
                    onChange={updateField("currentPassword")}
                    className="pr-12"
                    fieldClassName="gap-2"
                  />
                  <Button
                    className="absolute right-3 bottom-[11px] h-8 w-8 rounded-full text-[var(--color-content-tertiary)]"
                    variant="icon"
                    size="icon"
                    onClick={() => setShowCurrentPassword((current) => !current)}
                    aria-label={showCurrentPassword ? "Ocultar senha atual" : "Mostrar senha atual"}
                    icon={<Eye aria-hidden="true" className="h-4 w-4" />}
                  />
                </div>

                <Input label="Nova senha" type="password" value={profileForm.newPassword} onChange={updateField("newPassword")} fieldClassName="gap-2" />
                <Input
                  label="Confirmar nova senha"
                  type="password"
                  value={profileForm.confirmPassword}
                  onChange={updateField("confirmPassword")}
                  fieldClassName="gap-2"
                />

                <div className="inline-flex items-center gap-3">
                  <Button size="sm" onClick={handleSaveProfile}>
                    Salvar alterações
                  </Button>
                </div>

                {errorMessage ? (
                  <p
                    role="alert"
                    aria-live="assertive"
                    className="m-0 text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] text-[var(--color-feedback-error-content)]"
                  >
                    {errorMessage}
                  </p>
                ) : null}
                {successMessage ? (
                  <p
                    role="status"
                    aria-live="polite"
                    className="m-0 text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] text-[var(--color-feedback-success-content)]"
                  >
                    {successMessage}
                  </p>
                ) : null}
              </Card>
            </>
          ) : null}

          {activeSection === "academic" ? (
            <SettingsPlaceholder
              title="Acadêmico"
              description="Configure regras acadêmicas, calendário letivo e padrões de módulos."
            />
          ) : null}

          {activeSection === "users" ? (
            <section className="flex w-full flex-col gap-6">
              <header className="flex flex-col gap-4 border-b border-[var(--color-border-primary)] pb-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="m-0 text-[var(--text-heading-h6-size)] font-semibold leading-[var(--text-heading-6-line-height)] text-[var(--color-content-primary)]">
                    Usuários
                  </h2>
                  <p className="mt-1 mb-0 text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] text-[var(--color-content-tertiary)]">
                    Gerencie os usuários com acesso ao sistema.
                  </p>
                </div>
                <Button size="sm" icon={<UserRoundPlus aria-hidden="true" />} className="sm:w-auto w-full justify-center">
                  Criar usuário
                </Button>
              </header>

              <div className="flex flex-col gap-3">
                {users.map((user) => {
                  const initials = user.name
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 1)
                    .map((namePart) => namePart[0]?.toUpperCase() ?? "")
                    .join("");
                  const isActive = user.status === "Ativo";

                  return (
                    <Card
                      key={user.id}
                      className="flex-col gap-4 rounded-3xl bg-[var(--color-surface-card)] p-5 shadow-[var(--shadow-card-soft)] md:flex-row md:items-center md:justify-between"
                    >
                      <div className="inline-flex min-w-0 items-center gap-4">
                        <span
                          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-primary-subtle)] text-[var(--text-body-x-large-size)] font-semibold text-[var(--color-brand-primary-main)]"
                          aria-hidden="true"
                        >
                          {initials}
                        </span>

                        <div>
                          <strong className="block text-[var(--text-body-large-size)] font-semibold leading-[var(--text-body-line-height)] text-[var(--color-content-primary)]">
                            {user.name}
                          </strong>
                          <div className="mt-1 inline-flex items-center gap-2 text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] text-[var(--color-content-tertiary)]">
                            <span>{user.role}</span>
                            <span aria-hidden="true">•</span>
                            <Badge variant={isActive ? "success" : "error"}>{user.status}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="inline-flex w-full flex-wrap items-center gap-2 md:w-auto">
                        <Button size="sm" variant="secondary" icon={<Pencil aria-hidden="true" />}>
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className={isActive ? "text-[var(--color-feedback-error-content)]" : "text-[var(--color-feedback-success-content)]"}
                          icon={isActive ? <PowerOff aria-hidden="true" /> : <Power aria-hidden="true" />}
                          onClick={() => handleToggleUserStatus(user.id)}
                        >
                          {isActive ? "Desativar" : "Ativar"}
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          ) : null}
        </section>
      </div>
    </main>
  );
}
