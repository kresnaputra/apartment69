fn main() {
  // Cargo tidak tahu bahwa resource Windows (.ico yang di-embed ke .exe) berasal dari
  // folder ini, jadi build script tidak pernah jalan ulang saat icon diganti dan .exe
  // tetap memakai icon lama. Daftarkan folder icons secara eksplisit.
  println!("cargo:rerun-if-changed=icons");
  tauri_build::build()
}
