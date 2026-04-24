import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Download, Eye, FileText, Plus, Trash2, Upload, X } from "lucide-react";

import { Button, IconButton } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { CollapsibleCard } from "@/src/components/ui/collapsible-card";
import { Pill } from "@/src/components/ui/pill";
import { SearchInput } from "@/src/components/ui/search-input";
import { SecondaryButton } from "@/src/components/ui/secondary-button";
import { SelectField } from "@/src/components/ui/select-field";
import { StatusBadge } from "@/src/components/ui/status-badge";
import { TableCard } from "@/src/components/ui/table-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { statusOptions, type StatusFilter } from "../data/filters";
import { teachers } from "../data/teachers";

type TeacherSortKey = "name" | "status" | "contact" | "specialty";
type DrawerTab = "personal" | "contact" | "attachments";

type TeacherRecord = (typeof teachers)[number] & {
  details: {
    rg: string;
    birthDate: string;
    sex: string;
    maritalStatus: string;
    nationality: string;
    schoolEmail: string;
    attachmentsCount: number;
  };
};

type PersonalAttachmentRecord = {
  id: string;
  fileName: string;
  fileSizeLabel: string;
  createdAtLabel: string;
};

const drawerTabs: Array<{ id: DrawerTab; label: string }> = [
  { id: "personal", label: "Dados pessoais" },
  { id: "contact", label: "Contato" },
  { id: "attachments", label: "Anexos" }
];

const teacherDetailsById: Record<number, TeacherRecord["details"]> = {
  1: { rg: "12.345.678-9", birthDate: "10/01/1987", sex: "Feminino", maritalStatus: "Casada", nationality: "Brasileira", schoolEmail: "mariana.almeida@escolaclm.com", attachmentsCount: 2 },
  2: { rg: "23.456.789-0", birthDate: "18/04/1984", sex: "Masculino", maritalStatus: "Casado", nationality: "Brasileira", schoolEmail: "ricardo.nunes@escolaclm.com", attachmentsCount: 1 },
  3: { rg: "34.567.890-1", birthDate: "07/09/1990", sex: "Feminino", maritalStatus: "Solteira", nationality: "Brasileira", schoolEmail: "fernanda.costa@escolaclm.com", attachmentsCount: 2 },
  4: { rg: "45.678.901-2", birthDate: "22/11/1982", sex: "Masculino", maritalStatus: "Casado", nationality: "Brasileira", schoolEmail: "eduardo.martins@escolaclm.com", attachmentsCount: 1 },
  5: { rg: "56.789.012-3", birthDate: "30/06/1989", sex: "Feminino", maritalStatus: "Solteira", nationality: "Brasileira", schoolEmail: "juliana.farias@escolaclm.com", attachmentsCount: 2 },
  6: { rg: "67.890.123-4", birthDate: "14/12/1985", sex: "Masculino", maritalStatus: "Casado", nationality: "Brasileira", schoolEmail: "gustavo.ribeiro@escolaclm.com", attachmentsCount: 1 },
  7: { rg: "78.901.234-5", birthDate: "02/02/1991", sex: "Feminino", maritalStatus: "Solteira", nationality: "Brasileira", schoolEmail: "tatiane.moura@escolaclm.com", attachmentsCount: 1 },
  8: { rg: "89.012.345-6", birthDate: "25/08/1986", sex: "Masculino", maritalStatus: "Casado", nationality: "Brasileira", schoolEmail: "paulo.henrique@escolaclm.com", attachmentsCount: 1 }
};

const personalAttachmentsByTeacherId: Record<number, PersonalAttachmentRecord[]> = {
  1: [
    { id: "1-doc-1", fileName: "RG - Mariana Almeida.pdf", fileSizeLabel: "310 KB", createdAtLabel: "Enviado em 12/03/2026" },
    { id: "1-doc-2", fileName: "Comprovante de Residência.pdf", fileSizeLabel: "210 KB", createdAtLabel: "Enviado em 12/03/2026" }
  ],
  2: [{ id: "2-doc-1", fileName: "RG - Ricardo Nunes.pdf", fileSizeLabel: "248 KB", createdAtLabel: "Enviado em 15/03/2026" }],
  3: [
    { id: "3-doc-1", fileName: "RG - Fernanda Costa.pdf", fileSizeLabel: "196 KB", createdAtLabel: "Enviado em 20/03/2026" },
    { id: "3-doc-2", fileName: "CPF - Fernanda Costa.pdf", fileSizeLabel: "121 KB", createdAtLabel: "Enviado em 20/03/2026" }
  ],
  4: [{ id: "4-doc-1", fileName: "RG - Eduardo Martins.pdf", fileSizeLabel: "182 KB", createdAtLabel: "Enviado em 22/03/2026" }],
  5: [
    { id: "5-doc-1", fileName: "RG - Juliana Farias.pdf", fileSizeLabel: "204 KB", createdAtLabel: "Enviado em 27/03/2026" },
    { id: "5-doc-2", fileName: "Diploma Licenciatura.pdf", fileSizeLabel: "420 KB", createdAtLabel: "Enviado em 27/03/2026" }
  ],
  6: [{ id: "6-doc-1", fileName: "RG - Gustavo Ribeiro.pdf", fileSizeLabel: "240 KB", createdAtLabel: "Enviado em 30/03/2026" }],
  7: [{ id: "7-doc-1", fileName: "RG - Tatiane Moura.pdf", fileSizeLabel: "198 KB", createdAtLabel: "Enviado em 04/04/2026" }],
  8: [{ id: "8-doc-1", fileName: "RG - Paulo Henrique.pdf", fileSizeLabel: "201 KB", createdAtLabel: "Enviado em 09/04/2026" }]
};

function compareTeacherStatus(left: StatusFilter, right: StatusFilter) {
  const order = { Ativo: 0, Inativo: 1, Trancamento: 2, Todos: 3 };
  return order[left] - order[right];
}

function DrawerField({ label, value }: { label: string; value: string }) {
  return (
    <div className="student-field">
      <span className="student-field__label">{label}</span>
      <span className="student-field__value">{value}</span>
    </div>
  );
}

function ContactLinkRow({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div className="contact-link-row">
      <span className="student-field__label">{label}</span>
      <div className="contact-link-row__content">
        <a className="contact-link-row__link" href={href}>
          {value}
        </a>
        <button className="copy-icon-button" type="button" aria-label={`Copiar ${label}`}>
          <span className="copy-icon-button__back" aria-hidden="true" />
          <span className="copy-icon-button__front" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function PersonalAttachmentCard({ records }: { records: PersonalAttachmentRecord[] }) {
  return (
    <CollapsibleCard
      className="student-card student-card--attachments"
      title="Documentos Pessoais"
      icon={<FileText className="attachment-symbol attachment-symbol--section" aria-hidden="true" />}
      badge={records.length}
    >
      <div className="attachment-section__body">
        <SecondaryButton className="attachment-action-button" icon={<Upload className="attachment-symbol attachment-symbol--action" aria-hidden="true" />}>
          Adicionar documento
        </SecondaryButton>
        {records.length > 0 ? (
          <div className="attachment-files">
            {records.map((record) => (
              <article key={record.id} className="attachment-file">
                <div className="attachment-file__meta">
                  <FileText className="attachment-symbol attachment-symbol--file" aria-hidden="true" />
                  <div className="attachment-file__text">
                    <button className="attachment-file__name-button" type="button">
                      {record.fileName}
                    </button>
                    <span>{`${record.fileSizeLabel} · ${record.createdAtLabel}`}</span>
                  </div>
                </div>
                <div className="attachment-file__actions">
                  <button className="attachment-icon-button" type="button" aria-label={`Visualizar ${record.fileName}`}>
                    <Eye className="attachment-symbol attachment-symbol--action" aria-hidden="true" />
                  </button>
                  <button className="attachment-icon-button" type="button" aria-label={`Baixar ${record.fileName}`}>
                    <Download className="attachment-symbol attachment-symbol--action" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </CollapsibleCard>
  );
}

function TeacherDrawerTabContent({
  teacher,
  activeTab,
  personalAttachments
}: {
  teacher: TeacherRecord;
  activeTab: DrawerTab;
  personalAttachments: PersonalAttachmentRecord[];
}) {
  if (activeTab === "contact") {
    return (
      <div className="student-card student-card--contact">
        <ContactLinkRow label="Telefone" value={teacher.phone} href={`tel:${teacher.phone}`} />
        <ContactLinkRow label="E-mail" value={teacher.email} href={`mailto:${teacher.email}`} />
        <ContactLinkRow label="Email Escolar" value={teacher.details.schoolEmail} href={`mailto:${teacher.details.schoolEmail}`} />
      </div>
    );
  }

  if (activeTab === "attachments") {
    return <PersonalAttachmentCard records={personalAttachments} />;
  }

  return (
    <>
      <div className="student-card">
        <div className="student-card__grid student-card__grid--personal">
          <div className="student-field student-field--full">
            <span className="student-field__label">Nome completo</span>
            <strong className="student-field__value">{teacher.name}</strong>
          </div>
          <DrawerField label="RG" value={teacher.details.rg} />
          <DrawerField label="Data de nascimento" value={teacher.details.birthDate} />
          <DrawerField label="Sexo" value={teacher.details.sex} />
          <DrawerField label="Estado civil" value={teacher.details.maritalStatus} />
          <DrawerField label="Nacionalidade" value={teacher.details.nationality} />
        </div>
      </div>

      <div className="student-card">
        <h3 className="student-card__title">Especialidade</h3>
        <div className="student-card__stack">
          <div className="student-field">
            <span className="student-field__label">Área principal</span>
            <Pill label={teacher.specialty} tone={teacher.specialtyTone} />
          </div>
        </div>
      </div>
    </>
  );
}

function TeacherDrawer({
  teacher,
  activeTab,
  onTabChange,
  onClose,
  personalAttachments
}: {
  teacher: TeacherRecord;
  activeTab: DrawerTab;
  onTabChange: (tab: DrawerTab) => void;
  onClose: () => void;
  personalAttachments: PersonalAttachmentRecord[];
}) {
  const initials =
    teacher.initials ??
    teacher.name
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  return (
    <div className="student-drawer-overlay" role="presentation" onClick={onClose}>
      <aside
        className="student-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacher-drawer-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="student-drawer__header">
          <div className="student-drawer__summary">
            {teacher.avatar ? (
              <img className="student-drawer__avatar" src={teacher.avatar} alt="" aria-hidden="true" />
            ) : (
              <span className="student-drawer__avatar student-drawer__avatar--initials">{initials}</span>
            )}

            <div className="student-drawer__identity">
              <h2 id="teacher-drawer-title">{teacher.name}</h2>
              <StatusBadge status={teacher.status} />
            </div>
          </div>

          <IconButton className="student-drawer__close" icon={<X aria-hidden="true" />} label="Fechar painel" onClick={onClose} />
        </header>

        <div className="student-drawer__actions">
          <Button className="student-drawer__edit">Editar professor</Button>
          <IconButton className="student-drawer__delete" icon={<Trash2 aria-hidden="true" />} label={`Excluir ${teacher.name}`} />
        </div>

        <Tabs className="student-drawer__tabs-shell" value={activeTab} onValueChange={(value) => onTabChange(value as DrawerTab)}>
          <TabsList className="student-drawer__tabs" variant="drawer" aria-label="Seções do professor">
            {drawerTabs.map((tab) => (
              <TabsTrigger key={tab.id} className="student-drawer__tab" value={tab.id} variant="drawer">
                {tab.label}
                {tab.id === "attachments" ? <span className="student-drawer__tab-badge">{teacher.details.attachmentsCount}</span> : null}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="student-drawer__content">
            {drawerTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <TeacherDrawerTabContent teacher={teacher} activeTab={tab.id} personalAttachments={personalAttachments} />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </aside>
    </div>
  );
}

export function TeachersPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Todos");
  const [specialtyFilter, setSpecialtyFilter] = useState("Todas");
  const [teacherSortKey, setTeacherSortKey] = useState<TeacherSortKey>("name");
  const [teacherSortDirection, setTeacherSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherRecord | null>(null);
  const [activeTab, setActiveTab] = useState<DrawerTab>("personal");
  const [isDrawerClosing, setIsDrawerClosing] = useState(false);

  const teachersWithDetails = useMemo(
    () =>
      teachers.map((teacher) => ({
        ...teacher,
        details: teacherDetailsById[teacher.id]
      })),
    []
  );

  const closeDrawer = () => {
    setIsDrawerClosing(true);
    window.setTimeout(() => {
      setSelectedTeacher(null);
      setActiveTab("personal");
      setIsDrawerClosing(false);
    }, 220);
  };

  useEffect(() => {
    if (!selectedTeacher) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTeacher]);

  const specialtyOptions = useMemo(() => {
    const uniqueSpecialties = [...new Set(teachersWithDetails.map((teacher) => teacher.specialty).sort((a, b) => a.localeCompare(b, "pt-BR")))];
    return [{ value: "Todas", label: "Filtrar por especialidade" }, ...uniqueSpecialties.map((specialty) => ({ value: specialty, label: specialty }))];
  }, [teachersWithDetails]);

  const filteredTeachers = useMemo(() => {
    const visibleTeachers = teachersWithDetails.filter((teacher) => {
      const search = query.trim().toLowerCase();
      const matchesQuery =
        search === "" ||
        [teacher.name, teacher.phone, teacher.email].some((value) => value.toLowerCase().includes(search));
      const matchesSpecialty = specialtyFilter === "Todas" || teacher.specialty === specialtyFilter;
      const matchesStatus = statusFilter === "Todos" || teacher.status === statusFilter;

      return matchesQuery && matchesSpecialty && matchesStatus;
    });

    return [...visibleTeachers].sort((left, right) => {
      let comparison = 0;

      if (teacherSortKey === "name") {
        comparison = left.name.localeCompare(right.name, "pt-BR");
      }

      if (teacherSortKey === "status") {
        comparison = compareTeacherStatus(left.status, right.status);
      }

      if (teacherSortKey === "contact") {
        comparison = left.email.localeCompare(right.email, "pt-BR");
      }

      if (teacherSortKey === "specialty") {
        comparison = left.specialty.localeCompare(right.specialty, "pt-BR");
      }

      return teacherSortDirection === "asc" ? comparison : comparison * -1;
    });
  }, [query, specialtyFilter, statusFilter, teacherSortDirection, teacherSortKey, teachersWithDetails]);

  function handleTeacherSort(nextKey: TeacherSortKey) {
    if (nextKey === teacherSortKey) {
      setTeacherSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setTeacherSortKey(nextKey);
    setTeacherSortDirection("asc");
  }

  const teachersPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(filteredTeachers.length / teachersPerPage));
  const paginatedTeachers = useMemo(
    () => filteredTeachers.slice((currentPage - 1) * teachersPerPage, currentPage * teachersPerPage),
    [currentPage, filteredTeachers]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [query, specialtyFilter, statusFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const statusFilterOptions = statusOptions.map((option) => ({
    value: option,
    label: option === "Todos" ? "Filtrar por status" : option
  }));

  return (
    <>
      <main className={`students-page ${selectedTeacher ? "students-page--drawer-open" : ""}`}>
        <section className="page-header">
          <div className="page-header__copy">
            <h1>Professores -</h1>
            <p>Gerencie o cadastro completo de professores.</p>
          </div>

          <Button icon={<Plus aria-hidden="true" />} variant="ghost">
            Novo professor
          </Button>
        </section>

        <section className="filters" aria-label="Busca e filtros de professores">
          <SearchInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome, telefone ou email..."
            ariaLabel="Buscar por nome, telefone ou email"
          />

          <div className="filters__group">
            <SelectField
              ariaLabel="Filtrar por especialidade"
              value={specialtyFilter}
              options={specialtyOptions}
              onChange={(event) => setSpecialtyFilter(event.target.value)}
            />
            <SelectField
              ariaLabel="Filtrar por status"
              value={statusFilter}
              options={statusFilterOptions}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            />
          </div>
        </section>

        <TableCard title="Professores" titleId="teachers-title" countLabel={`${filteredTeachers.length} professores`}>
          <div className="table-scroll students-table-shell">
            <table className="students-table">
              <thead>
                <tr>
                  <th>
                    <div className="header-with-checkbox">
                      <Checkbox aria-label="Selecionar todos" />
                      <button
                        className={`table-header-button ${teacherSortKey === "name" ? "is-active" : ""}`}
                        type="button"
                        onClick={() => handleTeacherSort("name")}
                      >
                        <span>Nome</span>
                        <ChevronDown
                          className={`table-header-button__icon ${
                            teacherSortKey === "name" && teacherSortDirection === "asc" ? "is-ascending" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </th>
                  <th>
                    <button
                      className={`table-header-button ${teacherSortKey === "status" ? "is-active" : ""}`}
                      type="button"
                      onClick={() => handleTeacherSort("status")}
                    >
                      <span>Status</span>
                      <ChevronDown
                        className={`table-header-button__icon ${
                          teacherSortKey === "status" && teacherSortDirection === "asc" ? "is-ascending" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </th>
                  <th>
                    <span className="table-header-label">Contato</span>
                  </th>
                  <th>
                    <button
                      className={`table-header-button ${teacherSortKey === "specialty" ? "is-active" : ""}`}
                      type="button"
                      onClick={() => handleTeacherSort("specialty")}
                    >
                      <span>Especialidade</span>
                      <ChevronDown
                        className={`table-header-button__icon ${
                          teacherSortKey === "specialty" && teacherSortDirection === "asc" ? "is-ascending" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedTeachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>
                      <div className="student-cell">
                        <Checkbox aria-label={`Selecionar ${teacher.name}`} />

                        {teacher.avatar ? (
                          <img className="student-avatar" src={teacher.avatar} alt="" aria-hidden="true" />
                        ) : (
                          <span className="student-avatar student-avatar--initials">{teacher.initials}</span>
                        )}

                        <button
                          className="student-name-button"
                          type="button"
                          onClick={() => {
                            setSelectedTeacher(teacher);
                            setActiveTab("personal");
                          }}
                        >
                          <span className="student-name">{teacher.name}</span>
                        </button>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={teacher.status} />
                    </td>
                    <td>
                      <div className="contact-cell">
                        <span>{teacher.phone}</span>
                        <span>{teacher.email}</span>
                      </div>
                    </td>
                    <td>
                      <Pill label={teacher.specialty} tone={teacher.specialtyTone} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="students-mobile-list">
            {paginatedTeachers.map((teacher) => (
              <article key={teacher.id} className="students-mobile-card">
                <div className="students-mobile-card__header">
                  <div className="student-cell">
                    <Checkbox aria-label={`Selecionar ${teacher.name}`} />

                    {teacher.avatar ? (
                      <img className="student-avatar" src={teacher.avatar} alt="" aria-hidden="true" />
                    ) : (
                      <span className="student-avatar student-avatar--initials">{teacher.initials}</span>
                    )}

                    <button
                      className="student-name-button"
                      type="button"
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setActiveTab("personal");
                      }}
                    >
                      <span className="student-name">{teacher.name}</span>
                    </button>
                  </div>
                  <StatusBadge status={teacher.status} />
                </div>

                <div className="students-mobile-card__body">
                  <div className="students-mobile-card__field">
                    <span>Contato</span>
                    <div className="contact-cell">
                      <span>{teacher.phone}</span>
                      <span>{teacher.email}</span>
                    </div>
                  </div>

                  <div className="students-mobile-card__field">
                    <span>Especialidade</span>
                    <Pill label={teacher.specialty} tone={teacher.specialtyTone} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 ? (
            <footer className="pagination">
              <button
                className="pagination__button"
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
              >
                <span>Anterior</span>
              </button>

              <div className="pagination__numbers" aria-label="Paginação da tabela de professores">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    className={`pagination__number ${page === currentPage ? "is-active" : ""}`}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                className="pagination__button"
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
              >
                <span>Próxima</span>
              </button>
            </footer>
          ) : null}
        </TableCard>
      </main>

      {selectedTeacher ? (
        <div className={`student-drawer-shell ${isDrawerClosing ? "is-closing" : ""}`}>
          <TeacherDrawer
            teacher={selectedTeacher}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onClose={closeDrawer}
            personalAttachments={personalAttachmentsByTeacherId[selectedTeacher.id] ?? []}
          />
        </div>
      ) : null}
    </>
  );
}



