# -*- coding: utf-8 -*-
import json, time, urllib.request, urllib.parse, sys, string
OUT = sys.argv[1]
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"


def sug(q):
    url = "https://suggestqueries.google.com/complete/search?client=firefox&hl=es&gl=es&q=" + urllib.parse.quote(q)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read().decode("utf-8", "ignore"))
            return data[1]
    except Exception as e:
        return ["__ERR__ " + str(e)]


seeds = """software compliance
software compliance penal
software cumplimiento normativo
plataforma cumplimiento normativo
software gestión cumplimiento normativo
herramienta cumplimiento normativo
canal de denuncias
canal de denuncias software
canal de denuncias empresas
canal de denuncias ley 2/2023
canal de denuncias obligatorio
canal de denuncias precio
canal interno de información
sistema interno de información
software iso 9001
software gestión calidad
software sistema de gestión de calidad
software gestión de la calidad iso 9001
programa gestión calidad
software iso 14001
software gestión ambiental
software iso 45001
software prevención riesgos laborales
software prl
software gestión prl
software iso 27001
software seguridad de la información
software sistema de gestión integrado
software gestión integrada calidad medio ambiente prl
software gestión documental
gestor documental
gestor documental iso 9001
gestor documental calidad
software gestión documental empresas
software no conformidades
gestión de no conformidades
software auditorías internas
software gestión de auditorías
software gestión de riesgos
software gestión de riesgos empresariales
software grc
software esg
software sostenibilidad
software reporte sostenibilidad
software huella de carbono
software csrd
software informe sostenibilidad
software cae
coordinación de actividades empresariales software
software homologación de proveedores
evaluación de proveedores software
software gestión proveedores calidad
software gestión de incidencias
software quejas y reclamaciones
software protección de datos
software rgpd
software cumplimiento rgpd
software seguridad alimentaria
software appcc
software iso 22000
software ifs brc
software gestión mantenimiento instalaciones
software inspecciones reglamentarias
software control legionella
software gestión legal cumplimiento
identificación requisitos legales software
software requisitos legales
biblioteca de normas
software bpm
software automatización procesos
software gestión de procesos
software ticketing
portal del empleado
software portal del empleado
software recursos humanos
software gestión de formación
software control horario
software registro jornada
software gestión clínicas dentales
software cumplimiento normativo clínicas
software calidad sanitario
software gestión residuos
software gestión del agua
software compliance pyme
compliance officer herramientas
modelo de prevención de delitos
une 19601
une 19601 software
iso 37301
iso 37301 software
plan de compliance penal
programa de compliance
compliance penal empresa
sistema de gestión compliance
digitalizar iso 9001
digitalización sistema de gestión
automatizar sistema de gestión calidad
cumplimiento normativo empresas
cumplimiento normativo
normativa empresas
gestión del cumplimiento
software gestión integrada
isotools
isotools alternativas
software compliance españa
mejor software compliance
mejor software gestión calidad
software calidad pymes
software gestión calidad gratis
normapro
norma pro
instituto de innovación ciencia y empresa
software compliance precio
cuánto cuesta un software de compliance
software iso 9001 precio
software gestión calidad precio
debida diligencia software
mapa de riesgos penales
plantilla iso 9001
documentación iso 9001
procedimientos iso 9001
control de documentos iso 9001
software control documental
software gestión de contratistas
portal de contratistas
plataforma cae
software gestión epis
software vigilancia de la salud
software gestión de la seguridad y salud
software emisiones gei
calculadora huella de carbono empresas
software materialidad
doble materialidad
software esrs
software gestión del compliance
software gestión del riesgo penal
software cumplimiento legal
software legal tech compliance
software para consultoras de calidad
software consultoría iso
software certificación iso
software auditoría iso
digitalización pymes
kit digital software gestión
kit digital gestión de procesos
software gestión de la calidad en la nube
software gestión calidad industria
software calidad agroalimentario
software calidad construcción
software prl construcción
software cumplimiento normativo industria
software gestión de equipos de medida
software calibraciones
software gestión mantenimiento preventivo
software inventario activos
software plan de continuidad de negocio
software gestión incidencias seguridad información
software ens esquema nacional de seguridad
software nis2
software dora cumplimiento
software gestión de la privacidad
software registro de actividades de tratamiento
software brechas de seguridad rgpd
software evaluación del desempeño
software onboarding empleados
software gestión de ausencias
firma digital nóminas
software gestión de candidatos
software encuestas clima laboral
plataforma lms empresas
software gestión formación empleados
software satisfacción cliente
software gestión de objetivos e indicadores
cuadro de mando calidad
kpi calidad software
software informe de revisión por la dirección
revisión por la dirección iso 9001
software control de plagas
software gestión laboratorios
software trazabilidad sanitaria
software radiaciones ionizantes
software gestión de residuos sanitarios
software sandach
software vertidos
software emisiones atmosféricas
software autorización ambiental integrada
software gestión ambiental industria
software gestión de aguas residuales
que es un sistema de gestión de calidad
como implantar iso 9001
como implantar compliance penal
como implantar canal de denuncias
como hacer un plan de compliance
responsabilidad penal personas jurídicas
delitos empresa responsabilidad penal
sanciones canal de denuncias
multas incumplimiento normativo
auditoria de cumplimiento
compliance officer
que es compliance
que es cumplimiento normativo
compliance normativo
compliance laboral
compliance ambiental
compliance fiscal
compliance en pymes
software gestión integrada hseq
hseq software
software qhse
software ehs
software ehs españa
software gestión de seguridad y salud en el trabajo
software seguridad laboral
app prl
app gestión calidad
app canal de denuncias
app inspecciones
checklist digital
software checklist
formularios digitales empresa
software permisos de trabajo
software control de accesos obra
software gestión subcontratas construcción
software documentación obra
software gestión de calidad en obra""".strip().split("\n")
res = {}
for s in seeds:
    s = s.strip()
    if not s:
        continue
    res[s] = sug(s)
    time.sleep(0.25)
json.dump(res, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("seeds done", len(res), flush=True)

key = ["software compliance", "canal de denuncias", "software iso 9001", "software gestión calidad",
       "software cumplimiento normativo", "software prl", "software esg", "software gestión documental",
       "software cae", "software iso 27001", "software iso 14001", "software gestión de riesgos",
       "compliance penal", "software seguridad alimentaria", "software protección de datos",
       "software huella de carbono", "software no conformidades", "software auditorías",
       "gestor documental", "software recursos humanos", "normapro", "isotools",
       "cumplimiento normativo", "software calidad", "software sostenibilidad", "software iso 45001",
       "compliance", "sistema de gestión"]
exp = {}
suffixes = list(string.ascii_lowercase) + ["para", "en", "gratis", "precio", "mejor", "pymes", "online",
                                           "nube", "españa", "comparativa", "opiniones", "alternativa",
                                           "vs", "qué es", "cómo", "ejemplo", "plantilla", "obligatorio"]
prefixes = ["mejor", "mejores", "qué es", "cómo elegir", "comparativa", "precio", "cuánto cuesta", "para qué sirve"]
for k in key:
    exp[k] = {}
    for ch in suffixes:
        q = f"{k} {ch}"
        exp[k][q] = sug(q)
        time.sleep(0.25)
    for pre in prefixes:
        q = f"{pre} {k}"
        exp[k][q] = sug(q)
        time.sleep(0.25)
    json.dump(exp, open(OUT.replace(".json", "_exp.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("exp done", k, flush=True)
print("expansion done", flush=True)
