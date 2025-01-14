// /*
//  * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
//  * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
//  */

// package com.eventi.eventi.entities;

// import java.time.LocalDate;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.Table;

// @Entity
// @Table(name="prenotazioni")
// public class Prenotazioni {

//     @Id
//     @GeneratedValue(strategy=GenerationType.IDENTITY)
//     private long id;


//     @ManyToOne
//     @JoinColumn(name = "utente_id")
//     private long utente_id;

//     @ManyToOne
//     @JoinColumn(name="evento_id")
//     private long evento_id;

//     @Column
//     private boolean pagato;

//     @Column
//     private LocalDate createdAt;
// }
