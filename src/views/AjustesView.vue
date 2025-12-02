<template>
  <div class="p-6 max-w-4xl mx-auto space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-800">Ajustes del Sistema</h1>
      <p class="text-gray-500">Configura tu perfil y las preferencias de la aplicación</p>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="flex space-x-8" aria-label="Tabs">
        <button @click="activeTab = 'perfil'" :class="[
          activeTab === 'perfil'
            ? 'border-purple-600 text-purple-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors'
        ]">
          <i class="pi pi-user mr-2"></i>
          Mi Perfil
        </button>
        <button @click="activeTab = 'seguridad'" :class="[
          activeTab === 'seguridad'
            ? 'border-purple-600 text-purple-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors'
        ]">
          <i class="pi pi-shield mr-2"></i>
          Seguridad
        </button>
        <button v-if="auth.user?.rol_id === 1" @click="activeTab = 'sistema'" :class="[
          activeTab === 'sistema'
            ? 'border-purple-600 text-purple-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors'
        ]">
          <i class="pi pi-cog mr-2"></i>
          Sistema
        </button>
      </nav>
    </div>

    <!-- Content -->
    <div class="space-y-6">
      <!-- Perfil Tab -->
      <div v-if="activeTab === 'perfil'" class="space-y-6 animate-fade-in">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Información Personal</h3>
          <div class="flex items-start gap-6">
            <div class="relative group">
              <div
                class="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-3xl font-bold text-purple-600 border-4 border-white shadow-sm">
                {{ auth.user?.nombre?.charAt(0) || 'U' }}
              </div>
              <button
                class="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow border border-gray-200 text-gray-500 hover:text-purple-600 transition-colors">
                <i class="pi pi-camera text-sm"></i>
              </button>
            </div>
            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input type="text" :value="auth.user?.nombre"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                  readonly>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input type="email" :value="auth.user?.email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                  readonly>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <input type="text" :value="getRoleName(auth.user?.rol_id)"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Seguridad Tab -->
      <div v-if="activeTab === 'seguridad'" class="space-y-6 animate-fade-in">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Contraseña</h3>
          <Form :validation-schema="schema" @submit="onSubmit" class="space-y-4 max-w-md" v-slot="{ errors }">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
              <Field name="current" type="password"
                :class="['w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-colors', errors.current ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500']" />
              <ErrorMessage name="current" class="text-red-500 text-xs mt-1" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
              <Field name="new" type="password"
                :class="['w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-colors', errors.new ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500']" />
              <ErrorMessage name="new" class="text-red-500 text-xs mt-1" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar Nueva Contraseña</label>
              <Field name="confirm" type="password"
                :class="['w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-colors', errors.confirm ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500']" />
              <ErrorMessage name="confirm" class="text-red-500 text-xs mt-1" />
            </div>
            <button type="submit" :disabled="isChangingPassword"
              class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <i v-if="isChangingPassword" class="pi pi-spin pi-spinner"></i>
              {{ isChangingPassword ? 'Actualizando...' : 'Actualizar Contraseña' }}
            </button>
          </Form>
        </div>
      </div>

      <!-- Sistema Tab -->
      <div v-if="activeTab === 'sistema'" class="space-y-6 animate-fade-in">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Gestión de Inventariadores</h3>
          <p class="text-sm text-gray-500 mb-4">Agrega nuevos inventariadores al sistema para que puedan gestionar
            bienes.</p>

          <button @click="openModalInvetoriador = true"
            class="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition-colors duration-200 font-medium shadow-sm">
            <i class="pi pi-user-plus"></i>
            Agregar Inventariador
          </button>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Preferencias de Notificación</h3>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                checked>
              <span class="text-gray-700 text-sm">Notificarme cuando se asigne un bien</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                checked>
              <span class="text-gray-700 text-sm">Notificarme sobre bienes en reparación</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500">
              <span class="text-gray-700 text-sm">Recibir resumen semanal por correo</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Inventariador -->
    <ModalInventariador :isOpen="openModalInvetoriador" @close="openModalInvetoriador = false"
      @save="addInventariador" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import ModalInventariador from "../components/ModalInventariador.vue";
import { changePasswordService } from "../services/authService";
import Swal from "sweetalert2";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const auth = useAuthStore();
const activeTab = ref('perfil');
const openModalInvetoriador = ref(false);

const isChangingPassword = ref(false);

const schema = yup.object({
  current: yup.string().required("La contraseña actual es requerida"),
  new: yup.string().required("La nueva contraseña es requerida").min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirm: yup.string()
    .required("Debes confirmar la contraseña")
    .oneOf([yup.ref("new")], "Las contraseñas no coinciden"),
});

const addInventariador = (nuevoInventariador: any) => {
  console.log("Nuevo inventariador:", nuevoInventariador);
  openModalInvetoriador.value = false;
  // Aquí iría la lógica para guardar
};

const onSubmit = async (values: any, { resetForm }: any) => {
  isChangingPassword.value = true;

  try {
    await changePasswordService(values.current, values.new);
    
    Swal.fire({
      icon: "success",
      title: "¡Éxito!",
      text: "Contraseña actualizada correctamente",
      timer: 2000,
      showConfirmButton: false
    });

    resetForm();
    
  } catch (error: any) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Error al actualizar la contraseña",
    });
  } finally {
    isChangingPassword.value = false;
  }
};

const getRoleName = (rolId: number | undefined) => {
  if (!rolId) return 'Desconocido';
  const roles: Record<number, string> = {
    1: 'Administrador',
    2: 'Inventariador',
    3: 'Consulta'
  };
  return roles[rolId] || 'Desconocido';
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>