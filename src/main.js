import './style.css'

const WA_MECANICO = 'https://wa.me/56950688317'
const WA_PRODUCTOS = 'https://wa.me/56928181247'

function closeModal() {
  const el = document.getElementById('whatsapp-modal')
  if (!el) return
  el.classList.add('hidden')
  el.setAttribute('aria-hidden', 'true')
  document.body.style.overflow = ''
}

function openModal() {
  const el = ensureModal()
  el.classList.remove('hidden')
  el.setAttribute('aria-hidden', 'false')
  document.body.style.overflow = 'hidden'
}

function ensureModal() {
  let el = document.getElementById('whatsapp-modal')
  if (el) return el

  const svgWa =
    '<svg class="w-8 h-8 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.38-.22-3.69.97.99-3.59-.25-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>'

  document.body.insertAdjacentHTML(
    'beforeend',
    `<div id="whatsapp-modal" class="fixed inset-0 z-[100] hidden" aria-hidden="true" role="presentation">
  <div class="absolute inset-0 bg-black/60" data-whatsapp-modal-backdrop></div>
  <div class="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 pointer-events-auto border border-gray-200" role="dialog" aria-modal="true" aria-labelledby="whatsapp-modal-title">
      <h2 id="whatsapp-modal-title" class="text-xl font-bold text-gray-900 mb-1">Contacto por WhatsApp</h2>
      <p class="text-gray-600 text-sm mb-5">Elige si escribes al área de <strong class="text-gray-800">mecánico</strong> o de <strong class="text-gray-800">productos</strong>:</p>
      <div class="space-y-3">
        <a href="${WA_MECANICO}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 w-full bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg px-4 py-3 text-left transition">
          ${svgWa}
          <div>
            <div class="font-semibold text-gray-900">Mecánico</div>
            <div class="text-sm text-gray-600">+56 9 5068 8317</div>
          </div>
        </a>
        <a href="${WA_PRODUCTOS}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 w-full bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg px-4 py-3 text-left transition">
          ${svgWa}
          <div>
            <div class="font-semibold text-gray-900">Productos</div>
            <div class="text-sm text-gray-600">+56 9 2818 1247</div>
          </div>
        </a>
      </div>
      <button type="button" class="mt-5 w-full py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium" data-whatsapp-modal-close>Cancelar</button>
    </div>
  </div>
</div>`
  )

  el = document.getElementById('whatsapp-modal')
  el.querySelector('[data-whatsapp-modal-backdrop]').addEventListener('click', closeModal)
  el.querySelector('[data-whatsapp-modal-close]').addEventListener('click', closeModal)
  el.querySelectorAll('a[href^="https://wa.me"]').forEach((a) => {
    a.addEventListener('click', () => {
      closeModal()
    })
  })

  return el
}

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('.js-whatsapp-elegir')
  if (!trigger) return
  e.preventDefault()
  openModal()
})

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return
  const el = document.getElementById('whatsapp-modal')
  if (el && !el.classList.contains('hidden')) closeModal()
})
