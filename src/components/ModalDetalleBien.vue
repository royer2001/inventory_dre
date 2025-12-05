<template>
  <transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      @click.self="closeModal">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">

        <!-- Header simple -->
        <div class="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <h2 class="text-xl font-bold text-white">Detalle del Bien</h2>
                <span v-if="bien.tipo_registro"
                  :class="bien.tipo_registro === 'SIGA' ? 'bg-blue-400/30' : 'bg-purple-400/30'"
                  class="px-2 py-0.5 rounded text-xs font-semibold text-white">
                  {{ bien.tipo_registro }}
                </span>
              </div>
              <p class="text-blue-100 text-sm font-mono">{{ codigoCompleto }}</p>
            </div>
            <button @click="closeModal"
              class="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Contenido con scroll -->
        <div class="overflow-y-auto max-h-[calc(90vh-180px)] p-6">

          <!-- Estado destacado -->
          <div class="flex items-center gap-2 mb-6">
            <span class="text-sm text-gray-500">Estado:</span>
            <span :class="getEstadoBadge(bien.estado)" class="px-3 py-1 rounded-full text-sm font-semibold">
              {{ bien.estado || bien.estado_nombre }}
            </span>
          </div>

          <!-- Grid de información -->
          <div class="space-y-6">

            <!-- Identificación -->
            <section>
              <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                Identificación
              </h3>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <p class="text-xs text-gray-400 mb-1">Cód. Patrimonial</p>
                  <p class="font-mono font-semibold text-gray-800">{{ bien.codigo_patrimonio }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-400 mb-1">Cód. Interno</p>
                  <p class="font-mono font-semibold text-gray-800">{{ bien.codigo_interno }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-400 mb-1">Cód. Completo</p>
                  <p class="font-mono font-semibold text-indigo-600">{{ codigoCompleto }}</p>
                </div>
              </div>
            </section>

            <hr class="border-gray-100">

            <!-- Descripción -->
            <section>
              <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descripción
              </h3>
              <div class="space-y-2">
                <div>
                  <p class="text-xs text-gray-400 mb-1">Detalle del Bien</p>
                  <p class="text-gray-800">{{ bien.detalle_bien || '-' }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-400 mb-1">Descripción Completa</p>
                  <p class="text-gray-700 text-sm">{{ bien.descripcion || '-' }}</p>
                </div>
              </div>
            </section>

            <hr class="border-gray-100">

            <!-- Características Técnicas -->
            <section>
              <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Características Técnicas
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p class="text-xs text-gray-400 mb-1">Categoría</p>
                  <p class="text-gray-800 text-sm">{{ bien.categoria_nombre || '-' }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-400 mb-1">Marca</p>
                  <p class="text-gray-800 text-sm">{{ bien.marca || '-' }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-400 mb-1">Modelo</p>
                  <p class="text-gray-800 text-sm">{{ bien.modelo || '-' }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-400 mb-1">N° Serie</p>
                  <p class="text-gray-800 text-sm font-mono">{{ bien.serie || bien.numero_serie || '-' }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-400 mb-1">Color</p>
                  <p class="text-gray-800 text-sm">{{ bien.color || '-' }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-400 mb-1">Dimensión</p>
                  <p class="text-gray-800 text-sm">{{ bien.dimension || '-' }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-400 mb-1">Tipo Origen</p>
                  <p class="text-gray-800 text-sm">{{ bien.tipo_origen || '-' }}</p>
                </div>
              </div>
            </section>

            <hr class="border-gray-100">

            <!-- Responsable y Ubicación -->
            <section>
              <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Asignación
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                      {{ getInitials(bien.responsable_nombre) }}
                    </div>
                    <div>
                      <p class="text-xs text-gray-400">Responsable</p>
                      <p class="font-semibold text-gray-800">{{ bien.responsable_nombre || 'Sin asignar' }}</p>
                      <span v-if="bien.tipo_modalidad" :class="getRegimenBadge(bien.tipo_modalidad)"
                        class="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium">
                        {{ bien.tipo_modalidad }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-xs text-gray-400">Ubicación</p>
                      <p class="font-semibold text-gray-800">{{ bien.ubicacion_nombre || 'Sin ubicación' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr class="border-gray-100">

            <!-- Registro -->
            <section>
              <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Información de Registro
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p class="text-xs text-gray-400 mb-1">Inventariador</p>
                  <p class="text-gray-800 font-medium">{{ bien.inventariador_nombre || 'No especificado' }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-400 mb-1">Fecha de Registro</p>
                  <p class="text-gray-800">{{ formatFecha(bien.created_at) }}</p>
                </div>
                <div v-if="bien.updated_at && bien.updated_at !== bien.created_at">
                  <p class="text-xs text-gray-400 mb-1">Última Modificación</p>
                  <p class="text-gray-800">{{ formatFecha(bien.updated_at) }}</p>
                </div>
              </div>
            </section>

            <!-- Observaciones -->
            <section v-if="bien.observacion">
              <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Observaciones
              </h3>
              <div class="bg-amber-50 border border-amber-100 rounded-lg p-3">
                <p class="text-gray-700 text-sm whitespace-pre-wrap">{{ bien.observacion }}</p>
              </div>
            </section>

          </div>
        </div>

        <!-- Footer simple -->
        <div class="flex justify-between items-center border-t bg-gray-50 px-6 py-3">
          <p class="text-xs text-gray-400">
            Última consulta: {{ fechaActualizacion }}
          </p>
          <div class="flex gap-2">
            <button @click="imprimirDetalles"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Imprimir
            </button>
            <button @click="closeModal"
              class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script setup lang="ts">
import { computed } from "vue";

interface Bien {
  id: number;
  codigo_patrimonio: string;
  codigo_interno: string;
  codigo_completo?: string;
  descripcion: string;
  categoria_nombre: string;
  marca: string;
  modelo: string;
  estado?: string;
  detalle_bien: string;
  estado_nombre: string;
  responsable_nombre: string;
  ubicacion_nombre: string;
  observacion?: string;
  color?: string;
  dimension?: string;
  serie?: string;
  numero_serie?: string;
  tipo_registro?: string;
  tipo_origen?: string;
  tipo_modalidad?: string;
  inventariador_id?: number;
  inventariador_nombre?: string;
  created_at?: string;
  updated_at?: string;
}

const props = defineProps<{
  isOpen: boolean;
  bien: Bien;
}>();

const emit = defineEmits(["close"]);

// Computed
const codigoCompleto = computed(() => {
  if (props.bien.codigo_completo) {
    return props.bien.codigo_completo;
  }
  return `${props.bien.codigo_patrimonio}-${props.bien.codigo_interno}`;
});

const fechaActualizacion = computed(() => {
  return new Date().toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

// Helpers
const getInitials = (name: string | undefined) => {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
};

const formatFecha = (dateString: string | undefined) => {
  if (!dateString) return 'No registrada';
  return new Date(dateString).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getEstadoBadge = (estado: string | undefined) => {
  const styles: Record<string, string> = {
    'BUENO': 'bg-green-100 text-green-700',
    'REGULAR': 'bg-yellow-100 text-yellow-700',
    'MALO': 'bg-red-100 text-red-700'
  };
  return styles[estado?.toUpperCase() || ''] || 'bg-gray-100 text-gray-700';
};

const getRegimenBadge = (regimen: string | undefined) => {
  const styles: Record<string, string> = {
    'CAP': 'bg-emerald-100 text-emerald-700',
    'CAS': 'bg-amber-100 text-amber-700',
    'OTROS': 'bg-slate-100 text-slate-700'
  };
  return styles[regimen?.toUpperCase() || ''] || 'bg-gray-100 text-gray-600';
};

// Methods
const closeModal = () => emit("close");
const imprimirDetalles = () => window.print();
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media print {
  .no-print {
    display: none !important;
  }
}
</style>
