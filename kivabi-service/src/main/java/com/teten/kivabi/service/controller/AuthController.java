/** Author: Teten Nugraha User:tetennugraha Date:22/11/25 Time:03.46 */
package com.teten.kivabi.service.controller;

import com.teten.kivabi.service.security.dto.LoginRequest;
import com.teten.kivabi.service.security.dto.LoginResponse;
import com.teten.kivabi.service.security.dto.RegistrationRequest;
import com.teten.kivabi.service.security.dto.RegistrationResponse;
import com.teten.kivabi.service.security.jwt.JwtTokenService;
import com.teten.kivabi.service.security.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final JwtTokenService jwtTokenService;
  private final UserService userService;

  @PostMapping("/login")
  @Operation(
      tags = "Login Service",
      description =
          "You must log in with the correct information to successfully obtain the token information.")
  public ResponseEntity<ApiResponse<LoginResponse>> loginRequest(
      @Valid @RequestBody LoginRequest loginRequest) {

    final LoginResponse loginResponse = jwtTokenService.getLoginResponse(loginRequest);
    ApiResponse<LoginResponse> response = new ApiResponse<>(true, "Login berhasil", loginResponse);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/register")
  @Operation(
      tags = "Register Service",
      description =
          "You can register to the system by sending information in the appropriate format.")
  public ResponseEntity<ApiResponse<RegistrationResponse>> registrationRequest(
      @Valid @RequestBody RegistrationRequest registrationRequest) {

    final RegistrationResponse registrationResponse = userService.registration(registrationRequest);
    ApiResponse<RegistrationResponse> response =
        new ApiResponse<>(true, "Registrasi berhasil", registrationResponse);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }
}
